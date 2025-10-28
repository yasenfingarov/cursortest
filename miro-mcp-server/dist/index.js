import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import { MiroClient } from "./miroClient.js";
dotenv.config();
const miro = new MiroClient();
const server = new McpServer({
    name: "miro-mcp-server",
    version: "0.1.0"
});
const ListBoardsInput = z.object({
    limit: z.number().int().positive().max(100).optional()
});
const ListItemsInput = z.object({
    boardId: z.string(),
    limit: z.number().int().positive().max(200).optional()
});
const CreateStickyInput = z.object({
    boardId: z.string().optional(),
    content: z.string(),
    x: z.number().optional(),
    y: z.number().optional()
});
const CreateTextInput = z.object({
    boardId: z.string().optional(),
    content: z.string(),
    x: z.number().optional(),
    y: z.number().optional()
});
const CreateShapeInput = z.object({
    boardId: z.string().optional(),
    shape: z.enum(["rectangle", "circle", "triangle"]),
    text: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional()
});
function resolveBoardId(maybeBoardId) {
    const id = maybeBoardId || process.env.MIRO_DEFAULT_BOARD_ID || "";
    if (!id) {
        throw new Error("Board ID is required. Provide 'boardId' or set MIRO_DEFAULT_BOARD_ID.");
    }
    return id;
}
server.tool("miro_list_boards", "List Miro boards accessible by the token", ListBoardsInput.shape, async (args) => {
    const { limit } = args;
    const boards = await miro.listBoards(limit);
    return { content: [{ type: "text", text: JSON.stringify(boards, null, 2) }] };
});
server.tool("miro_list_items", "List items on a given Miro board", ListItemsInput.shape, async (args) => {
    const { boardId, limit } = args;
    const items = await miro.listItems(boardId, limit);
    return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
});
server.tool("miro_create_sticky", "Create a sticky note on a board", CreateStickyInput.shape, async (args) => {
    const boardId = resolveBoardId(args.boardId);
    const item = await miro.createStickyNote({ boardId, content: args.content, x: args.x, y: args.y });
    return { content: [{ type: "text", text: JSON.stringify(item, null, 2) }] };
});
server.tool("miro_create_text", "Create a text object on a board", CreateTextInput.shape, async (args) => {
    const boardId = resolveBoardId(args.boardId);
    const item = await miro.createText({ boardId, content: args.content, x: args.x, y: args.y });
    return { content: [{ type: "text", text: JSON.stringify(item, null, 2) }] };
});
server.tool("miro_create_shape", "Create a simple shape on a board", CreateShapeInput.shape, async (args) => {
    const boardId = resolveBoardId(args.boardId);
    const item = await miro.createShape({ boardId, shape: args.shape, text: args.text, x: args.x, y: args.y });
    return { content: [{ type: "text", text: JSON.stringify(item, null, 2) }] };
});
const transport = new StdioServerTransport();
await server.connect(transport);
