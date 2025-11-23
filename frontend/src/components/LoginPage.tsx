import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const { user, loginError, login, logout, restoreLogin } = useAuthStore();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    restoreLogin();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ username: username, password: password })
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    logout()
  };

  return (
    <div className="main-container">
      <h1>Login Page</h1>
      <p style={{ color: "red" }}>{loginError}</p>
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