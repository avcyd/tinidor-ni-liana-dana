import { useState } from 'react';
import './App.css'
import {login, getCurrentUser, doOnAuthStateChange, logout} from './services/AuthService';
import { getUserById } from './services/UserService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  doOnAuthStateChange(async()=>{
    const user = await getUserById(getCurrentUser()?.uid || '');
    setCurrentUser( user.displayName || '')
  });

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
     <h2>Login:</h2>
      <h3>Status: {(currentUser) ? `Welcome: ${currentUser} ` : "Not Logged in (Form Disabled)"}</h3>
      <section >
      {!currentUser ? (<>
       <div className="form-input">
          <label>Title</label>
          <input disabled={currentUser ?  true : false} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
         <div className="form-input">
          <label>password: </label>
          <input disabled={currentUser ?  true : false} type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button onClick={handleSubmit}>Submit</button></>) : <button onClick={logout}>Logout</button> }
      </section>
     </div>
    </>
  )
}
export default Login;
