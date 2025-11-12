// middlewares/corsMiddleware.js
import cors from "cors";

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;

