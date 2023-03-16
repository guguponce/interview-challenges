import type { Developer } from "./types";

export default function contarLosLenguajes(developers: Developer[]): Record<string, number> {
  // TODO: implementar
  let languages = {};
  developers.forEach((dev) => {
    if (languages[dev.language] > 0) {
      languages[dev.language]++;
    } else {
      languages[dev.language] = 1;
    }
  });
  return languages;
}
