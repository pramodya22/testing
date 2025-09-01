import type { Express } from "express";
import type { Server } from "http";
import { createServer as createViteServer } from "vite";
import path from "path";

export function log(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: path.resolve(process.cwd(), "client"),
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");
  
  app.use(express.static(distPath));
  
  // Catch-all handler for SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}