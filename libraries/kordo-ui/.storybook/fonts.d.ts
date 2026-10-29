// Vite sert les polices comme des URL ; TypeScript, lui, ne connaît pas l'extension.
declare module '*.ttf' {
  const url: string;
  export default url;
}
