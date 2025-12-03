# SPEC-B-api.md

## Endpoints

### 1. Create Cart
- **POST /api/cart**
- **Response**: `{ "cartId": string }`

### 2. Get Cart
- **GET /api/cart/:cartId**
- **Response**: `{ "id": string, "items": CartItem[] }`
- **404** if cart not found or expired

### 3. Add Item
- **POST /api/cart/:cartId/items**
- **Body**: `{ "productId": string, "quantity": number, "price": number }`
- **Response**: `{ "id": string, "items": CartItem[] }`
- **404** if cart not found or expired

### 4. Remove Item
- **DELETE /api/cart/:cartId/items/:itemId**
- **Response**: `{ "id": string, "items": CartItem[] }`
- **404** if cart not found or expired

## Notes
- All responses are JSON.
- Cart TTL (expiry) is simulated in SalesforceCartClient.
- No persistence; restarting server loses all carts.