import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {  
   const res = await fetch('http://localhost:3000/api/getpost/?id='+params.id);  
	const post = await res.json();  
	return { props: {post} };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/loadpost');  
  const allPostsData = await res.json();      
  
  const paths = allPostsData.map((post) => ({
    params: { id: post.title },
  }))
  
  return {
	paths,
	fallback: false,
  };
}

export default function Post({ post }) {
  return (
    <Layout>
	  <Head>
	    <title>{post.title}</title>
	  </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}
