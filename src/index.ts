import { app } from "./app";
import { userRouter } from "./routes/userRoutes";

app.use('/users', userRouter)