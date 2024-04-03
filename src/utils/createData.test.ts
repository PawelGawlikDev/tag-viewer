import createData from "./createData";

test("Should create simple Data object", () => {
  const id = 1;
  const name = "java";
  const count = 5;

  const data = createData(id, name, count);

  expect(data.id).toBe(id);
  expect(data.name).toBe(name.charAt(0).toUpperCase() + name.slice(1));
  expect(data.count).toBe(count);
});
