export default function createData(
  id: number,
  name: string,
  count: number,
): Data {
  return {
    id,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count,
  };
}
