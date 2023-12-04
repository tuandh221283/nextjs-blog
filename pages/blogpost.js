import dynamic from 'next/dynamic'
import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import axios from 'axios';
import Link from 'next/link';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})




const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

/*function  onSubmit (value) {
console.log(value)
  let data={content : value}
    axios.post('/api/sendpost', data)
    .then((response) => {
      console.log(response)
})
.catch((e) => { console.log(e)}
)}*/

export async function getStaticProps() {	
  const res = await fetch('http://localhost:3000/api/loadpost');  
  const allPostsData = await res.json();  
  return { props: {allPostsData} };
}

export default function Home({allPostsData}) {
  const [contentValue, setContentValue] = useState('');
  const [posts, setPosts] = useState(allPostsData);      
  const [hidPostId, setHidPostId] = useState('');
  const [txtPostTitle, setTxtPostTitle] = useState('');
  const [selected, setSelected] = useState('');
  const [defValueCate, setDefValueCate] = useState('');
  const [errors, setErrors] = useState('');
  
  const options = [
    {id: '', name: '--Choose an option--'},    
  ];  
  const [category, setCategory] = useState(options);  	
  const getCategories = async () => {
	  const data = await fetch("http://localhost:3000/api/loadcategory");
	  const categories = await data.json();

	  setCategory(categories);
	};
	
	useEffect(() => {
		getCategories()		
	  }, [])
	  
  const handlePostId = event => {	
    setHidPostId(event.target.value);	
  };
  
  const handlePostTitle = event => {    	
	if(event.target.value.length > 0) {
		setErrors('');
	}
    setTxtPostTitle(event.target.value);	

  };  
  
  const handleDropdownChanged = event => {   	
    setDefValueCate(event.target.value);	
  };  
  
  const handleChange = event => {    
    setSelected(event.target.value);
	let data={selectcate : event.target.value}
		axios.post('/api/loadpost', data)
		.then((response) => {		  
		  setPosts(response.data)		  
	})
	.catch((e) => { console.log(e)}
	)
  };
  
  const handleButtonEdit = async (id) => {
	  const res = await fetch('http://localhost:3000/api/getpostbyid/?id='+id, {cache: "no-store"});
	  const post = await res.json();  	 
	  //console.log(post.id);
		setHidPostId(post.id);
		setTxtPostTitle(post.title);
		setContentValue(post.content);
		setDefValueCate(post.category_id);
  };
  
  const handleButtonDelete = async (id) => {
	  if (confirm('Are you sure ?')) {
		  const res = await fetch('http://localhost:3000/api/deletepost/?id='+id);
		  const post = await res.json();  	 
		  
		  // Reload list
			let dataReload={}
				axios.post('/api/loadpost', dataReload)
				.then((response) => {		  
				  setPosts(response.data)		  
			})
			.catch((e) => { console.log(e)}
			)
		}
		
		return true;
  };
  
  function submitHandler(event) {    

	if (txtPostTitle.length === 0){
			setErrors('Title is required.');
			return false;
	}
	
    const requestObj = {      
		id: hidPostId,
      title: txtPostTitle,
      content: contentValue,
      category_id: defValueCate
    };

    fetch('/api/sendpost', {
      method: 'POST',
      body: JSON.stringify(requestObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then((data) => {
        console.log(data)					
      });
	  
	  // Reset form
	  resetForm();
	// Reload list
	let dataReload={}
		axios.post('/api/loadpost', dataReload)
		.then((response) => {		  
		  setPosts(response.data)		  
	})
	.catch((e) => { console.log(e)}
	)
  }
  
  function resetForm(event){
	  setHidPostId(0);
		setTxtPostTitle('');
		setDefValueCate(1);
		setContentValue('');
  }
  
  return (
    <div>
		<div id='form-post'>
			<div id='cate-option'>			
				<label htmlFor="post_category">Category </label>
				  <select name='post_category' id='post-category' value={defValueCate} onChange={handleDropdownChanged}>			  
					{category.map(option => (
					  <option key={option.id} value={option.id}>
						{option.name}
					  </option>
					))}
				  </select>
				</div>
				<input id='post_id' type='hidden' name='post_id' value={hidPostId} onChange={handlePostId} />
				<label htmlFor="post_title">Title </label>
				<input id='post_title' type='text' placeholder='Title' name='post_title' value={txtPostTitle} onChange={handlePostTitle} required='required' />
					{(errors.length > 0) ? <span style={{color: "red"}}> * {errors}</span> : ''}
			  <QuillNoSSRWrapper modules={modules} placeholder='compose here' value={contentValue} onChange={setContentValue} formats={formats} theme="snow" id='post_content'  />
			 <button onClick={e => submitHandler()}> Send post</button>  
			 &nbsp;<button onClick={e => resetForm()}> Reset</button>  
		</div>
		
	<hr />
		<div>
	<h1>Listing</h1>
	
	<div>
      <select value={selected} onChange={handleChange}>
	  <option key='0' value='0'>
            --Choose an option--
          </option>
        {category.map(option => (
		
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
	
	<ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blogpost/${post.title}`}>{post.title}</Link> | <button onClick={() => handleButtonEdit(post.id)}>Edit</button> | <button onClick={() => handleButtonDelete(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
  </div>
  </div>  
  
)}
  
  