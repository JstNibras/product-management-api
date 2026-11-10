interface Product {
  id: number;
  name: string;
  price: number;
}

class ProductRepository {
  private products: Product[] = [
      { id: 1, name: "Laptop", price: 50000 },
      { id: 2, name: "Phone", price: 25000 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  create(data: Omit<Product, "id">): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, data: Omit<Product, "id">): Product | undefined {
    const index = this.products.findIndex(
      (product) => product.id === id
    );

    if (index === -1) return undefined;

    const updatedProduct = { id, ...data };
    this.products[index] = updatedProduct;

    return updatedProduct;
  }

  delete(id: number): Product | undefined {
    const index = this.products.findIndex(
      (product) => product.id === id
    );

    if (index === -1) return undefined;

    return this.products.splice(index, 1)[0];
  }
}

export default ProductRepository;