export const servidor = process.env.SERVIDOR ?? "0.0.0.0:8080"; // "rimajonb.araozu.dev"; // "0.0.0.0:8080"; //
export const servidorF = process.env.SERVIDORF ?? `http://${servidor}`;
export const wsServidor = process.env.SERVIDORWS ?? `ws://${servidor}`;

console.log(servidor, servidorF, wsServidor);
