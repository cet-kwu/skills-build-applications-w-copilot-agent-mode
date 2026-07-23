// Shared API configuration for the Octofit Tracker presentation tier.
//
// `VITE_CODESPACE_NAME` must be defined for API requests to reach the
// logic tier when running inside a GitHub Codespace. Define it in a
// `.env.local` file at the root of `octofit-tracker/frontend`, for example:
//
//   VITE_CODESPACE_NAME=your-codespace-name
//
// See `.env.example` in this project for a template.

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

if (!codespaceName) {
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000 " +
      "for API requests. Define VITE_CODESPACE_NAME in .env.local to target " +
      "your Codespace's forwarded port instead.",
  );
}

// Safe fallback avoids producing an invalid `https://undefined-8000...` URL
// when VITE_CODESPACE_NAME is unset (e.g. running locally outside Codespaces).
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";

/**
 * Fetches a resource collection from the API and normalizes the response
 * so callers always receive a plain array, whether the API returns a bare
 * array (e.g. `[...]`) or a paginated shape (e.g. `{ results: [...] }` or
 * `{ data: [...] }`).
 */
export async function fetchCollection(resource) {
  const url = `${API_BASE_URL}/api/${resource}/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}
