# SPEC-A-architecture.md

## Goal
Design a thin Experience API for a telecom cart built on a non-persistent Salesforce cart context.

## Core Components
1. **Experience API (Node + TypeScript)**
   - Exposes REST endpoints to manipulate the cart.
   - Handles request/response translation.
   - Does not persist state beyond Salesforce cart lifetime.

2. **SalesforceCartClient (Test Double)**
   - Mimics Salesforce cart behavior.
   - Supports:
     - createCart(): string (returns cartId)
     - getCart(cartId): Cart | null
     - addItem(cartId, item): Cart
     - removeItem(cartId, itemId): Cart
     - expireCart(cartId): void
   - Automatically expires carts after a configurable TTL.

3. **In-memory Cart Store**
   - Holds cart data temporarily.
   - Pure functions for read/write:
     - getCart(cartId)
     - saveCart(cart)
     - deleteCart(cartId)

4. **Models / Types**
   - Cart: { id: string, items: CartItem[], createdAt: Date }
   - CartItem: { id: string, productId: string, quantity: number, price: number }

5. **Unit Testing**
   - Use Jest or Vitest.
   - Test:
     - Cart creation
     - Item addition/removal
     - Expiry behavior