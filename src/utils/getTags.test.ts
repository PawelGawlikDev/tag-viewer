import getTags from "./getTags";

test("Should fetch data for js tag", async () => {
  const response = await getTags(
    "https://api.stackexchange.com/2.3/tags?pagesize=1&order=desc&sort=popular&inname=javascript&site=stackoverflow",
  );

  expect(await response[0].name).toBe("javascript");
  expect(await response[0].count).toBeGreaterThan(0);
});
