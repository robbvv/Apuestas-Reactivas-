import type { UserData } from "../types/user";
import userService from "../services/user"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//falta css
const UserPage = () => {
  
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await userService.getUser();
        setUser(res);
      } catch (error) {
        navigate("/login");
      }
    }
    init();
  }, [])

  if (!user) return (<p>LOADING USER</p>)

  return (
    <div className="main-container">
      <h1>Your username is: {user.username}</h1>
      <div className="container-info">
        <h2>Your bets</h2>
        {user.bets && user.bets.length > 0 ? (
          <ul>
            {user.bets.map((b, i) => (
              <li key={i}>
                <div>
                  Bet #{i + 1}: {b.option} - {b.amount}
                </div>
                <div>
                  <Link to={`/event-page/${b.betId}`}>See my bet</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't made any bets yet.</p>
        )}
      </div>
      <div className="container-info">
        <h2>Your own events</h2>
        {user.ownBets && user.ownBets.length > 0 ? (
          <ul>
            {user.ownBets.map((b, i) => (
              <li key={i}>
                <div>
                  Event #{i + 1}: {b.title}
                </div>
                <div>
                  <Link to={`/event-page/${b.id}`}>See my event</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </div>
    </div>
  )

}

export default UserPage;