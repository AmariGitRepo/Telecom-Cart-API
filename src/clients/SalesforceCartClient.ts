import { Cart, CartItem } from "../models/Cart";
import crypto from "crypto";

export class SalesforceCartClient {
  private carts = new Map<string, Cart>();
  private ttl: number;

  constructor(ttlMs = 5 * 60 * 1000) {
    this.ttl = ttlMs; // default 5 minutes TTL
  }

  createCart(): string {
    const id = crypto.randomUUID();
    const cart: Cart = { id, items: [], createdAt: new Date() };
    this.carts.set(id, cart);
    // Auto-expire cart
    setTimeout(() => this.carts.delete(id), this.ttl);
    return id;
  }

  getCart(cartId: string): Cart | null {
    return this.carts.get(cartId) || null;
  }

  addItem(cartId: string, item: Omit<CartItem, "id">): Cart | null {
    const cart = this.carts.get(cartId);
    if (!cart) return null;
    const newItem: CartItem = { ...item, id: crypto.randomUUID() };
    cart.items.push(newItem);
    return cart;
  }

  removeItem(cartId: string, itemId: string): Cart | null {
    const cart = this.carts.get(cartId);
    if (!cart) return null;
    cart.items = cart.items.filter(i => i.id !== itemId);
    return cart;
  }
}