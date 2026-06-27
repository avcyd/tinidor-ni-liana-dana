import { useState } from 'react';
import './App.css'
// import {addArticle} from './services/ArticleService';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([])
  const handleSubmit = async () => {
    try{
      // const id = await addArticle({});
      console.log(`Success`);
    }catch(e){
      console.error(`Error: ${e}`)
    }
  }

  return (
    <>
     <div>
      <h2>add user (firestore/auth):</h2>
      <section >
        <div className="form-input">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="form-input">
          <label>Password: </label>
          <input type="password" value={content} onChange={e=>setContent(e.target.value)}/>
        </div>
         <div className="form-input">
          <label>display name: </label>
          <input type="text" value={tags} onChange={e=>setTags(e.target.value.split(","))}/>
        </div>
        <button onClick={handleSubmit}>Submit</button>
       </section>
     </div>
    </>
  )
}
export default CreatePosts;
