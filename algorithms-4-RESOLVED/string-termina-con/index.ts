export default function stringTerminaCon(
  string: string,
  final: string
): boolean {
  const regex = new RegExp(`${final}$`)
  return regex.test(string);
}
