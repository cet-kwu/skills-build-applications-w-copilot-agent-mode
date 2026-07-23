const codespaceName = process.env.CODESPACE_NAME;

export const PORT = process.env.PORT || 8000;

/**
 * Public base URL for this API. When running inside a GitHub Codespace,
 * ports are exposed at https://$CODESPACE_NAME-<port>.app.github.dev.
 * Falls back to localhost when CODESPACE_NAME is not set.
 */
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

/**
 * Public base URL for the paired frontend (Vite dev server on port 5173),
 * used to allow it as a CORS origin.
 */
export const FRONTEND_BASE_URL = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : "http://localhost:5173";
