//=========== To fetch data locally
//import fsPromises from 'fs/promises';
//import path from 'path';

export async function getData() {
  const res = await fetch("http://127.0.0.1/merchant-api/country");
  return res.json();
}