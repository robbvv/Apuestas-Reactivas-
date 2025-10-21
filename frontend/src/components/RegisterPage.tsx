import { useState } from "react";
import userService from "../services/user";
import "../styles/event-form.css";
// falta css
const RegisterPage = () => {
  const [newUsername, setNewUsername] = useState<string>("")
  const [newEmail, setNewEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!newUsername.trim() || !newEmail.trim() || !newPassword.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrorMessage("Email is not valid.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    
    const newUser = {
      username: newUsername,
      email: newEmail,
      password: newPassword
    };

    try {
      await userService.createUser(newUser);

      setSuccessMessage("User created!");
      setNewUsername("");
      setNewEmail("");
      setNewPassword("");
    } catch (err: any) {
      if (err.response?.data?.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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