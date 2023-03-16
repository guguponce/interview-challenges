export default function buscarAislado(numeros: number[]): number {
  let pares: number[] = []
  let impares: number[] = []
  numeros.forEach(numero=>numero%2 === 0 ? pares.push(numero) : impares.push(numero))
  return pares.length>impares.length ? impares[0] : pares[0];
}
