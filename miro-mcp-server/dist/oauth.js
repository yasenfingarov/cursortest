import dotenv from "dotenv";
dotenv.config();
const AUTH_URL = "https://miro.com/oauth/authorize";
const TOKEN_URL = "https://api.miro.com/v1/oauth/token";
function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`${name} is required`);
    return value;
}
export function buildAuthUrl(scopes) {
    const clientId = getRequiredEnv("MIRO_CLIENT_ID");
    const redirectUri = getRequiredEnv("MIRO_REDIRECT_URI");
    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scopes.join(" ")
    });
    return `${AUTH_URL}?${params.toString()}`;
}
export async function exchangeCodeForToken(code) {
    const clientId = getRequiredEnv("MIRO_CLIENT_ID");
    const clientSecret = getRequiredEnv("MIRO_CLIENT_SECRET");
    const redirectUri = getRequiredEnv("MIRO_REDIRECT_URI");
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
    });
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Token exchange failed ${res.status}: ${txt}`);
    }
    const json = await res.json();
    return { ...json, obtained_at: Date.now() };
}
export async function refreshAccessToken(refreshToken) {
    const clientId = getRequiredEnv("MIRO_CLIENT_ID");
    const clientSecret = getRequiredEnv("MIRO_CLIENT_SECRET");
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret
    });
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Token refresh failed ${res.status}: ${txt}`);
    }
    const json = await res.json();
    return { ...json, obtained_at: Date.now() };
}
