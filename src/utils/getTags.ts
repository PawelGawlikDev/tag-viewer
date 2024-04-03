const getTags = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  const formattedData = data.items.map((tag: any) => ({
    count: tag.count,
    name: tag.name,
  }));

  return formattedData;
};

export default getTags;
