## Miro MCP Server

Minimal MCP server to interact with Miro boards: list boards/items and create sticky notes, text, and shapes.

### Setup

1. Create `.env` from `.env.example` and fill values:

```
MIRO_ACCESS_TOKEN=your_miro_access_token
MIRO_DEFAULT_BOARD_ID=optional_default_board
```

2. Install deps and build:

```
npm install
npm run build
```

3. Run (stdio):

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
        "MIRO_ACCESS_TOKEN": "...",
        "MIRO_DEFAULT_BOARD_ID": "..."
      }
    }
  }
}
```

