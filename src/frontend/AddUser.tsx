import { useState } from "react";
import { setUser } from "../services/UserService";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const handleSubmit = async () => {
    try {
      const id = await setUser(
        { email: email, displayName: displayName },
        password,
      );
      console.log(`Success created user of ${id}`);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  };

  return (
    <>
      <div>
        <h2>add user (firestore/auth):</h2>
        <section>
          <div className="form-input">
            <label>email address: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>display name: </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </section>
      </div>
    </>
  );
}
export default AddUser;
