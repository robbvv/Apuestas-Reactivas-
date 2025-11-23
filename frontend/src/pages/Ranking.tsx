import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import { FaCoins, FaMedal } from "react-icons/fa";
import userService from "../services/user";

interface TopUser {
  username: string;
  coins: number;
}

const Ranking = () => {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
        const data = await userService.getTopUsers();
        setTopUsers(data);
        setLoading(false);
      };
    fetchRanking();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (topUsers.length === 0) return <p className="mt-3 text-center">No bets yet. Be the first!</p>;

  const maxCoins = topUsers[0].coins || 1;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🏆 Top 10 Gamblers</h2>

      <div className="d-flex flex-column gap-3">
        {topUsers.map((user, index) => {
          let bgColor = "light";
          if (index === 0) bgColor = "warning";
          else if (index === 1) bgColor = "secondary";
          else if (index === 2) bgColor = "info";

          return (
            <Card
              key={user.username}
              className={`shadow-sm border-0`}
              bg={bgColor.toLowerCase() as any}
              text={index < 3 ? "dark" : "dark"}
            >
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <span style={{ fontSize: "1.5rem" }}>
                    {index === 0 ? <FaMedal style={{ color: "gold" }} /> :
                     index === 1 ? <FaMedal style={{ color: "silver" }} /> :
                     index === 2 ? <FaMedal style={{ color: "#cd7f32" }} /> :
                     `#${index + 1}`}
                  </span>
                  <span style={{ fontWeight: "bold" }}>{user.username}</span>
                </div>
                <div className="text-end" style={{ minWidth: "120px" }}>
                  <FaCoins /> {user.coins}
                  <ProgressBar
                    now={(user.coins / maxCoins) * 100}
                    variant={index < 3 ? "success" : "primary"}
                    className="mt-1"
                  />
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;