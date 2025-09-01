import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";


export default function Auth({ setCurrentUser }) {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="auth-container">
      <h1>🍲 Cook Book </h1>
      {isSignup ? (
        <>
          <Signup setCurrentUser={setCurrentUser} />
          <p className="toggle-text">
            Already have an account?{" "}
            <span onClick={() => setIsSignup(false)}>Login</span>
          </p>
        </>
      ) : (
        <>
          <Login setCurrentUser={setCurrentUser} />
          <p className="toggle-text">
            Don't have an account?{" "}
            <span onClick={() => setIsSignup(true)}>Signup</span>
          </p>
        </>
      )}
    </div>
  );
}
