# PROMPTS.md

## Initial Prompt
"Generate a Node.js + TypeScript implementation of the following thin Experience API for a telecom cart. The architecture is defined in SPEC-A-architecture.md and API endpoints in SPEC-B-api.md. Implement an in-memory SalesforceCartClient with cart TTL expiration. Include unit tests using Vitest."

## Follow-ups
- "Add TTL logic for cart expiry in SalesforceCartClient."
- "Write unit tests for createCart, addItem, removeItem, and expiry scenarios."