import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/PostRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

export default app;