// middlewares/corsMiddleware.js
import cors from "cors";

const corsOptions = {
  origin: ["http://gig-connect-client.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;




