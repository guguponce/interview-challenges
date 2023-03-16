import type { Developer } from "./types";

export default function encontrarAlMasViejo(developers: Developer[]): Developer[] {
  let oldestAge = 0;
  developers.forEach((dev) => {
    if (dev.age > oldestAge) {
      oldestAge = dev.age;
    }
  });

  return developers.filter((dev) => dev.age === oldestAge);
}
