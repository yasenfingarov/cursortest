import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { OAuthTokens, refreshAccessToken } from "./oauth.js";

dotenv.config();

export type MiroBoard = {
    id: string;
    name: string;
};

export type MiroItem = {
    id: string;
    type: string;
    content?: string;
};

export class MiroClient {
    private accessToken: string;
    private readonly tokensPath: string;
    private readonly baseUrl: string = "https://api.miro.com/v2";

    constructor(params?: { accessToken?: string; tokensPath?: string }) {
        const tokenFromEnv = process.env.MIRO_ACCESS_TOKEN?.trim();
        this.accessToken = (params?.accessToken ?? tokenFromEnv) || "";
        this.tokensPath = params?.tokensPath || process.env.MIRO_TOKENS_PATH || path.resolve(process.cwd(), "miro_tokens.json");
    }

    private async request<T>(path: string, init?: RequestInit): Promise<T> {
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
            if (response.status === 401 && await this.tryRefreshToken()) {
                return this.request<T>(path, init);
            }
            const body = await response.text().catch(() => "");
            throw new Error(`Miro API error ${response.status}: ${body}`);
        }
        return await response.json() as T;
    }

    private async tryRefreshToken(): Promise<boolean> {
        try {
            const raw = await fs.readFile(this.tokensPath, "utf8").catch(() => "");
            if (!raw) return false;
            const tokens = JSON.parse(raw) as OAuthTokens;
            if (!tokens.refresh_token) return false;
            const newTokens = await refreshAccessToken(tokens.refresh_token);
            this.accessToken = newTokens.access_token;
            const merged: OAuthTokens = { ...tokens, ...newTokens };
            await fs.writeFile(this.tokensPath, JSON.stringify(merged, null, 2), "utf8");
            return true;
        } catch (_e) {
            return false;
        }
    }

    async listBoards(limit: number = 50): Promise<MiroBoard[]> {
        type Response = { data: Array<{ id: string; name: string }> };
        const data = await this.request<Response>(`/boards?limit=${limit}`);
        return data.data.map(b => ({ id: b.id, name: b.name }));
    }

    async listItems(boardId: string, limit: number = 100): Promise<MiroItem[]> {
        type Response = { data: Array<{ id: string; type: string; data?: { content?: string; text?: string } }> };
        const data = await this.request<Response>(`/boards/${boardId}/items?limit=${limit}`);
        return data.data.map(i => ({ id: i.id, type: i.type, content: i.data?.content ?? i.data?.text }));
    }

    async createStickyNote(params: { boardId: string; content: string; x?: number; y?: number }): Promise<MiroItem> {
        type Response = { id: string; type: string; data?: { content?: string } };
        const body = {
            data: { content: params.content },
            position: { x: params.x ?? 0, y: params.y ?? 0 }
        };
        const data = await this.request<Response>(`/boards/${params.boardId}/sticky_notes`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return { id: data.id, type: data.type, content: data.data?.content };
    }

    async createText(params: { boardId: string; content: string; x?: number; y?: number }): Promise<MiroItem> {
        type Response = { id: string; type: string; data?: { content?: string; text?: string } };
        const body = {
            data: { content: params.content },
            position: { x: params.x ?? 0, y: params.y ?? 0 }
        };
        const data = await this.request<Response>(`/boards/${params.boardId}/texts`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return { id: data.id, type: data.type, content: data.data?.content ?? data.data?.text };
    }

    async createShape(params: { boardId: string; shape: "rectangle" | "circle" | "triangle"; text?: string; x?: number; y?: number }): Promise<MiroItem> {
        type Response = { id: string; type: string; data?: { content?: string; shape?: string } };
        const body = {
            data: {
                shape: params.shape,
                content: params.text ?? ""
            },
            position: { x: params.x ?? 0, y: params.y ?? 0 }
        };
        const data = await this.request<Response>(`/boards/${params.boardId}/shapes`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return { id: data.id, type: data.type, content: data.data?.content };
    }
}

