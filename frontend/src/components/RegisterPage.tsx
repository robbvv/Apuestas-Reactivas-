import { useState } from "react";
import userService from "../services/user";
import "../styles/event-form.css";
// falta css
const RegisterPage = () => {
  const [newUsername, setNewUsername] = useState<string>("")
  const [newEmail, setNewEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      username: newUsername,
      email: newEmail,
      password: newPassword
    };

    userService.createUser(newUser);

    setNewUsername("");
    setNewEmail("");
    setNewPassword("");
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(event.target.value);
  };

  return (
    <div className="main-container">
      <h1>Sign up</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-inline">Username: <input
          type="text"
          value={newUsername}
          placeholder="Type your username"
          onChange={handleUsernameChange}
        />
        </label>
        <label className="form-inline">Email: <input
          type="text"
          value={newEmail}
          placeholder="Type you email"
          onChange={handleEmailChange}
        />
        </label>
        <label className="form-inline">Password: <input
          type="password"
          value={newPassword}
          placeholder="Type your password"
          onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage;