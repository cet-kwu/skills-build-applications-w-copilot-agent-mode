# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Environment variables

This app calls the backend API at
`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`, so
`VITE_CODESPACE_NAME` **must** be defined for API requests to work inside a
GitHub Codespace.

1. Copy `.env.example` to `.env.local` (git-ignored):
   ```bash
   cp octofit-tracker/frontend/.env.example octofit-tracker/frontend/.env.local
   ```
2. Set `VITE_CODESPACE_NAME` in `.env.local` to your Codespace name, e.g. the
   output of `echo $CODESPACE_NAME`.

If `VITE_CODESPACE_NAME` is unset, the app falls back to
`http://localhost:8000` instead of producing an invalid
`https://undefined-8000...` URL, and logs a warning to the console.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
