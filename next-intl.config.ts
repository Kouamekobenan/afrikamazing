// src/next-intl.config.ts
import path from "path";
import fs from "fs";

export default async function getMessages(locale: string) {
  // Chemin absolu vers src/messages
  const messagePath = path.join(
    process.cwd(),
    "src",
    "messages",
    `${locale}.json`
  );

  if (fs.existsSync(messagePath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const messages = require(messagePath);
    return messages.default ?? messages;
  }

  // Fallback à l'anglais si la locale n'existe pas
  const fallbackPath = path.join(process.cwd(), "src", "messages", "en.json");
  if (fs.existsSync(fallbackPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const messages = require(fallbackPath);
    return messages.default ?? messages;
  }

  // Si rien trouvé → renvoie objet vide pour éviter le crash
  return {};
}
