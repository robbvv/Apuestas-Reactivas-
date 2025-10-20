import type { UserData } from "../types/user";
import userService from "../services/user"
import { useEffect, useState } from "react";

const UserPage = () => {
  
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const init = async () => {
      const res = await userService.getUser();
      setUser(res)
    }
    init();
  }, [])

  if (!user) return (<p>CARGANDO USER</p>)

  return (
    <div>
      <h1>Tu nombre es: {user.username}</h1>
    </div>
  )

}

export default UserPage;