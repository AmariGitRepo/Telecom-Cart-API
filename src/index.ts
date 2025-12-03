import express from "express";
import { cartRouter } from "./api/cart";

const app = express();
app.use(express.json());

app.use("/api/cart", cartRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Telecom Cart API running at http://localhost:${PORT}`);
});