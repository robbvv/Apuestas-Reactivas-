import app from "./app";
import config from "./utils/config";

const PORT = config.PORT;
const HOST = config.HOST;

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

app.listen(Number(PORT), HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
