## Miro MCP Server

Minimal MCP server to interact with Miro boards: list boards/items and create sticky notes, text, and shapes.

### Setup (OAuth)

1. Create `.env` from `.env.example` and fill values:

```
MIRO_CLIENT_ID=your_client_id
MIRO_CLIENT_SECRET=your_client_secret
MIRO_REDIRECT_URI=https://yourapp.example.com/callback
MIRO_SCOPES=boards:read boards:write
MIRO_TOKENS_PATH=/absolute/path/to/miro_tokens.json
MIRO_DEFAULT_BOARD_ID=optional_default_board
```

2. Install deps and build:

```
npm install
npm run build
```

3. Obtain tokens:
   - Show auth URL: `npm run oauth:url`
   - After authorizing, set `MIRO_AUTH_CODE` and run: `npm run oauth:exchange`
   - Tokens are saved to `MIRO_TOKENS_PATH`

4. Run (stdio):

```
npm start
```

### Tools

- `miro_list_boards` { limit? }
- `miro_list_items` { boardId, limit? }
- `miro_create_sticky` { boardId?, content, x?, y? }
- `miro_create_text` { boardId?, content, x?, y? }
- `miro_create_shape` { boardId?, shape: rectangle|circle|triangle, text?, x?, y? }

### Configure with MCP client

Example client configuration entry:

```json
{
  "mcpServers": {
    "miro-mcp-server": {
      "command": "node",
      "arguments": ["/absolute/path/to/miro-mcp-server/dist/index.js"],
      "env": {
        "MIRO_CLIENT_ID": "...",
        "MIRO_CLIENT_SECRET": "...",
        "MIRO_REDIRECT_URI": "https://yourapp.example.com/callback",
        "MIRO_TOKENS_PATH": "/abs/path/miro_tokens.json",
        "MIRO_DEFAULT_BOARD_ID": "..."
      }
    }
  }
}
```

