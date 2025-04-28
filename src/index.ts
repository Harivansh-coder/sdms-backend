import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "@/src/routes/auth";
import ordersRouter from "@/src/routes/orders";
import partnersRouter from "@/src/routes/partners";
import assignmentsRouter from "@/src/routes/assignments";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/assignments", assignmentsRouter);

export default app;

// start server for development environment
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
