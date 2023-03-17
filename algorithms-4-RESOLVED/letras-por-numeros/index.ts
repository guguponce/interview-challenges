export default function letrasPorNumeros(string: string): string {
  const alphabet = " abcdefghijklmnopqrstuvwxyz"
  return string.toLowerCase().split("").filter(letter=>letter!==" "&&alphabet.includes(letter)).map(letter=>alphabet.indexOf(letter)).join(" ")
}
