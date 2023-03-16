import type { Developer } from "./types";

export default function encontrarLaMedia(developers: Developer[]): number {
  let sumAges=0
   developers.forEach((dev)=>sumAges+=dev.age)
  return Math.round(sumAges/developers.length);
}
