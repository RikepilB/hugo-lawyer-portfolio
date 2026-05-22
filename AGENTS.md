# AGENTS.md

## Codebase Defaults & Coding Style
*   **Language & Stack:** Modern TypeScript, React Server Components by default, Tailwind CSS for layout orchestration.
*   **Code Conventions:** 2-space indentation, explicit semicolons, trailing commas, and descriptive camelCase naming for functions/utilities.
*   **Import Optimization:** Always utilize native path aliases (e.g., `@/*` mapped to `./src/*`) to prevent messy, deeply-nested relative paths.

## Testing & Quality Control
*   **Colocated Tests:** Place unit and integration test specs (`*.test.ts/tsx`) directly adjacent to the files they are testing to ensure high visibility.
*   **Validation Verification:** Before presenting code as complete, verify it passes local type-checking, core business logic unit tests, and primary user flow E2E specs.

## Production Security Gates
*   **Zero Secret Leaks:** Never commit `.env` files, production database strings, private access tokens, or unencrypted local user storage.
*   **Input Sanitization:** Treat all external network payloads, file parsing streams, and route parameters as untrusted. Enforce strict validation schemas at the system boundary before processing.