import { describe, it, expect } from "vitest";
import { SalesforceCartClient } from "../src/clients/SalesforceCartClient";

describe("SalesforceCartClient", () => {
  it("creates and retrieves a cart", () => {
    const client = new SalesforceCartClient(1000);
    const cartId = client.createCart();
    const cart = client.getCart(cartId);
    expect(cart).not.toBeNull();
    expect(cart?.id).toBe(cartId);
  });

  it("adds and removes items", () => {
    const client = new SalesforceCartClient(1000);
    const cartId = client.createCart();
    client.addItem(cartId, { productId: "p1", quantity: 2, price: 10 });
    const cart = client.getCart(cartId);
    expect(cart?.items.length).toBe(1);
    const itemId = cart?.items[0].id!;
    client.removeItem(cartId, itemId);
    expect(client.getCart(cartId)?.items.length).toBe(0);
  });

  it("expires cart after TTL", async () => {
    const client = new SalesforceCartClient(100);
    const cartId = client.createCart();
    await new Promise(r => setTimeout(r, 150));
    expect(client.getCart(cartId)).toBeNull();
  });
});
