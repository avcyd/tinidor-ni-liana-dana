import { useState } from 'react';
import './App.css'
import {createPost} from './services/ArticleService';
import {getCurrentUser, doOnAuthStateChange } from './services/AuthService';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([])


  const [currentUser, setCurrentUser] = useState('');

  doOnAuthStateChange(()=>setCurrentUser(getCurrentUser()?.uid || ''));

  const handleSubmit = async () => {
    try{
      await createPost({creatorId: currentUser, title: title, content: content, tags: tags});
      console.log(`Success`);
    }catch(e){
      console.error(`Error: ${e}`)
    }
  }

  return (
    <>
     <div>
      <h2>Create Post:</h2>
      <h3>Status: {currentUser && "Form Enabled" || "Not Logged in (Form Disabled)"}</h3>
      <section >
        <div className="form-input">
          <label>Title</label>
          <input disabled={currentUser ? false : true} type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="form-input">
          <label>contents: </label>
          <textarea disabled={currentUser ? false : true} value={content} onChange={e=>setContent(e.target.value)}/>
        </div>
         <div className="form-input">
          <label>tags: </label>
          <input disabled={currentUser ? false : true} type="text" value={tags} onChange={e=>setTags(Array.from(e.target.value.split(",").map(tag => tag.trim())))}/>
        </div>
        <button onClick={handleSubmit}>Submit</button>
       </section>
     </div>
    </>
  )
}
export default CreatePosts;
