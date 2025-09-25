import { buildAuthUrl, exchangeCodeForToken } from "./oauth.js";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
async function main() {
    const scopes = (process.env.MIRO_SCOPES || "boards:read boards:write").split(/\s+/).filter(Boolean);
    const outFile = process.env.MIRO_TOKENS_PATH || path.resolve(process.cwd(), "miro_tokens.json");
    const url = buildAuthUrl(scopes);
    process.stdout.write(`Open this URL to authorize:\n${url}\n\n`);
    const code = process.env.MIRO_AUTH_CODE;
    if (!code) {
        process.stdout.write("Set MIRO_AUTH_CODE with the code from the redirect and rerun.\n");
        process.exit(1);
        return;
    }
    const tokens = await exchangeCodeForToken(code);
    await fs.writeFile(outFile, JSON.stringify(tokens, null, 2), "utf8");
    process.stdout.write(`Tokens saved to ${outFile}\n`);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
