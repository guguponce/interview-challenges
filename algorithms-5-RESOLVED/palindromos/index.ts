// export default function posiblePalindromo(num: number): boolean {
//   let arr: string | string[] = num + "";
//   arr = arr.split("");
//   let test = true;
//   for (let i = 0; i < arr.length / 2; i++) {
//     if (arr[i] !== arr[arr.length - i - 1]) {
//       test = false;
//       break;
//     }
//   }
//   return false;
// }
export default function posiblePalindromo(num): boolean {
  let arr: string | string[] = num + "";
  arr = arr.split("");
  let test = true;
  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - i - 1]) {
      return false;
    }
  }
  return true;
}
