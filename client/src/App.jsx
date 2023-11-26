import "./App.css";
import Messenger from "./pages/Messenger";
import { useState } from "react";
import { useUserContext } from "./context/userContext";

function App() {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(username);
  };

  return (
    <>
      {user ? (
        <Messenger />
      ) : (
        <div className="appWrapper">
          <div>
            <h1>Enter a Username</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="inputLogin"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <button type="submit">JOIN</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
