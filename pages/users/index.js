import React, { useState } from "react";
import "./Auth.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signing up with Username:", username, "Password:", password);
    } else {
      console.log("Logging in with Username:", username, "Password:", password);
    }
  };

  return (
    <section>
      {Array(130)
        .fill("")
        .map((_, index) => (
          <span key={index}></span>
        ))}

      <div className="signin">
        <div className="content">
          <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
          <form className="form" onSubmit={handleLogin}>
            <div className="inputBox">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>
            {isSignup && (
              <div className="inputBox">
                <input type="email"  />
                <i>Email</i>
              </div>
            )}
            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="#" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Already have an account? Sign In" : "Signup"}
              </a>
            </div>
            <div className="inputBox">
              <input type="submit" value={isSignup ? "Sign Up" : "Login"} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default App;
