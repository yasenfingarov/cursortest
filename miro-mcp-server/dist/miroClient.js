import dotenv from "dotenv";
dotenv.config();
export class MiroClient {
    accessToken;
    baseUrl = "https://api.miro.com/v2";
    constructor(params) {
        const tokenFromEnv = process.env.MIRO_ACCESS_TOKEN?.trim();
        this.accessToken = (params?.accessToken ?? tokenFromEnv) || "";
        if (!this.accessToken) {
            throw new Error("MIRO_ACCESS_TOKEN is required");
        }
    }
    async request(path, init) {
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, {
            ...init,
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json",
                ...(init?.headers || {})
            }
        });
        if (!response.ok) {
            const body = await response.text().catch(() => "");
            throw new Error(`Miro API error ${response.status}: ${body}`);
        }
        return await response.json();
    }
    async listBoards(limit = 50) {
        const data = await this.request(`/boards?limit=${limit}`);
        return data.data.map(b => ({ id: b.id, name: b.name }));
    }
    async listItems(boardId, limit = 100) {
        const data = await this.request(`/boards/${boardId}/items?limit=${limit}`);
        return data.data.map(i => ({ id: i.id, type: i.type, content: i.data?.content ?? i.data?.text }));
    }
    async createStickyNote(params) {
        const body = {
            data: { content: params.content },
            position: { x: params.x ?? 0, y: params.y ?? 0 }
        };
        const data = await this.request(`/boards/${params.boardId}/sticky_notes`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return { id: data.id, type: data.type, content: data.data?.content };
    }
    async createText(params) {
        const body = {
            data: { content: params.content },
            position: { x: params.x ?? 0, y: params.y ?? 0 }
        };
        const data = await this.request(`/boards/${params.boardId}/texts`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return { id: data.id, type: data.type, content: data.data?.content ?? data.data?.text };
    }
    async createShape(params) {
        const body = {
            data: {
                shape: params.shape,
                content: params.text ?? ""
            },
            position: { x: params.x ?? 0, y: params.y ?? 0 }
        };
        const data = await this.request(`/boards/${params.boardId}/shapes`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return { id: data.id, type: data.type, content: data.data?.content };
    }
}
