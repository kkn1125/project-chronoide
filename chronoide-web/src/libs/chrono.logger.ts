import { Logger } from "effect";

export const log = Logger.make(({ logLevel, message }) => {
  globalThis.console.log(`[${logLevel.label}] ${message}`);
});
