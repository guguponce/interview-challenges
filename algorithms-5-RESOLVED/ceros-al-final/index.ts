export default function moverCeros(array: unknown[]): unknown[] {

return [...array.filter(val=>val!==0), ...array.filter(val=>val===0)];
}
