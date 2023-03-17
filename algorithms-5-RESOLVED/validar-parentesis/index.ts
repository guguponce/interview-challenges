export default function validarParéntesis(parentesis: string): boolean {
  let count = 0;
  for (let i = 0; i < parentesis.length; i++) {
    const p = parentesis[i];
    if (count < 0) {
      return false;
    } else if (p === "(") {
      count++;
    } else if (p === ")") {
      count--;
    }
  }
  return count === 0;
}

