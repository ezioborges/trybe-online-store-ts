export const getCategories = async () => {
  const url = "https://api.mercadolibre.com/sites/MLB/categories";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }

    const json = await response.json();
    return json;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getProductsFromCategoryAndQuery = async (
  categoryId: string = "",
  query: string = ""
) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = response.json();
    return json;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getProductsByQuery = async (query: string) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.results;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};
