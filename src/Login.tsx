import { useState } from 'react';
import './App.css'
import {login, getCurrentUser, doOnAuthStateChange, logout} from './services/AuthService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  doOnAuthStateChange(()=>setCurrentUser(getCurrentUser()?.uid || ''));

  const handleSubmit = async () => {
    try{
      await login(email, password);
      console.log(`Success welcome ${getCurrentUser()?.uid}`);
    }catch(e){
      alert(`Invalid Username or Password`)
    }
  }

  return (
    <>
     <div>
      <h2>add user (firestore/auth):</h2>
      <span>Status :{currentUser || "Not Logged in"}</span>
      <section >
        <div className="form-input">
          <label>Title</label>
          <input disabled={currentUser? true : false} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
         <div className="form-input">
          <label>password: </label>
          <input disabled={currentUser? true : false} type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        {currentUser ? <button onClick={logout}>Logout</button> : <button onClick={handleSubmit}>Submit</button> }
       </section>
     </div>
    </>
  )
}
export default Login;
