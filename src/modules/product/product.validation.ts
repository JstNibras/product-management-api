export interface ProductInput {
  name: string;
  price: number;
}

export const validateProduct = (data: unknown): data is ProductInput => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const product = data as Record<string, unknown>;

  return (
    typeof product.name === "string" &&
    product.name.trim() !== "" &&
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    product.price > 0
  );
};