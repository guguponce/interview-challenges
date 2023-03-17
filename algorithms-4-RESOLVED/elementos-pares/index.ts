export default function filtrarPares(array: unknown[]): unknown[] {
  let arr: Array<any[]> = [];

  array.forEach((item) => {
    let itemPresent = false;
    arr.forEach((i, index) => {
      if (i[0] == item) {
        let newCount = i[1] + 1;
        arr[index] = [i[0], newCount];
        itemPresent = true;
      }
    });
    if (itemPresent === false) {
      arr.push([item, 1]);
    }
  });
  return arr.filter((tuple) => tuple[1] % 2 === 0).map((tup) => tup[0]);
}
