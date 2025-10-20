import { useState, useEffect } from "react";
import type { UserData } from "../types/user";
import loginService from "../services/login"

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const user = await loginService.restoreLogin();
      setUser(user);
    }
    init();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  return (
    <div className="main-container">
      <h1>Login Page</h1>
      <p style={{ color: "red" }}>{errorMessage}</p>
      {!user ? 
      (<form className="form-container" onSubmit={handleLogin}>
        <label className="form-inline"> Username:
        <input type="text" value={username} name="Username" placeholder="Username" onChange={({target}) => setUsername(target.value)}></input></label>
        
        <label className="form-inline"> Password:
        <input type="password" value={password} name="Password" placeholder="Password" onChange={({target}) => setPassword(target.value)}></input></label>

        <button  type="submit">Log in</button>

      </form>) : (<p>Usuario {user.username} logueado <button onClick={handleLogout}>log out</button></p>)}
      
    </div>
  )
};

export default LoginPage;