import type { Developer } from "./types";

export default function pedirDetalles(developers: Developer[]): Developer[] {
  let newList: Developer[] = [];
  developers.forEach((dev) => {
    for (const prop in dev) {
      if (dev[prop] === null) {
        newList.push({ ...dev, question: `Hi, could you please provide your ${prop}.` });
      }
    }
  });
  return newList;
}
