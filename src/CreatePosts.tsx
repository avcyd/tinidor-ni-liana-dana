import { useState } from 'react';
import './App.css'
import {createPost} from './services/ArticleService';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([])
  const handleSubmit = async () => {
    try{
      await createPost({title: title, content: content, tags: tags});
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
          <label>contents: </label>
          <textarea value={content} onChange={e=>setContent(e.target.value)}/>
        </div>
         <div className="form-input">
          <label>tags: </label>
          <input type="text" value={tags} onChange={e=>setTags(Array.from(e.target.value.split(",").map(tag => tag.trim())))}/>
        </div>
        <button onClick={handleSubmit}>Submit</button>
       </section>
     </div>
    </>
  )
}
export default CreatePosts;
