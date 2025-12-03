import express from "express";
import { SalesforceCartClient } from "../clients/SalesforceCartClient";

export const cartRouter = express.Router();
const client = new SalesforceCartClient();

// Create Cart
cartRouter.post("/", (_req, res) => {
  const cartId = client.createCart();
  res.json({ cartId });
});

// Get Cart
cartRouter.get("/:cartId", (req, res) => {
  const cart = client.getCart(req.params.cartId);
  if (!cart) return res.status(404).send({ error: "Cart not found or expired" });
  res.json(cart);
});

// Add Item
cartRouter.post("/:cartId/items", (req, res) => {
  const { productId, quantity, price } = req.body;
  if (!productId || !quantity || !price) {
    return res.status(400).send({ error: "Missing item fields" });
  }
  const cart = client.addItem(req.params.cartId, { productId, quantity, price });
  if (!cart) return res.status(404).send({ error: "Cart not found or expired" });
  res.json(cart);
});

// Remove Item
cartRouter.delete("/:cartId/items/:itemId", (req, res) => {
  const cart = client.removeItem(req.params.cartId, req.params.itemId);
  if (!cart) return res.status(404).send({ error: "Cart not found or expired" });
  res.json(cart);
});