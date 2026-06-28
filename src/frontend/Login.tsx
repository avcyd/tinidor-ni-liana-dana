import { useState, useEffect } from "react";
import {
  login,
  getCurrentUser,
  doOnAuthStateChange,
  logout,
} from "../services/AuthService";
import { getUserById } from "../services/UserService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsub = doOnAuthStateChange(async (user) => {
      if (!user) {
        setCurrentUser("");
        return;
      }
      const userData = await getUserById(user.uid);
      setCurrentUser(userData.displayName || "");
    });
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      await login(email, password);
      console.log(`Success welcome ${getCurrentUser()?.uid}`);
    } catch (e) {
      alert(`Invalid Username or Password`);
    }
  };

  return (
    <>
      <div>
        <h2>Login:</h2>
        <h3>
          Status:{" "}
          {currentUser
            ? `Welcome: ${currentUser} `
            : "Not Logged in (Form Disabled)"}
        </h3>
        <section>
          <div className="form-input">
            <label>Title</label>
            <input
              disabled={currentUser ? true : false}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>password: </label>
            <input
              disabled={currentUser ? true : false}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {currentUser ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </section>
      </div>
    </>
  );
}
export default Login;
