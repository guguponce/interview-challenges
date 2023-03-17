export default function esIsograma(string: string): boolean {
  let lettersCount: string[] = [];
  string === "" && false;
  const strArr = string.toLowerCase().split("")
  for (let i=0; i<strArr.length; i++){
    const letter = strArr[i]
    if (lettersCount.includes(letter)) {
      return false;
    }else{
      lettersCount.push(letter)
 }
  };
  return true;
}
