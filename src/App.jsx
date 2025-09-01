import './App.css'
import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";


export default function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <div className="app-container">
      {!currentUser ? (
        <Auth setCurrentUser={setCurrentUser} />
      ) : (
        <Dashboard setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}
