import { prisma } from "@/lib/prisma";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  specifications: Record<string, string>;
};

function parseSpecs(raw: string): Record<string, string> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });

    return dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      inStock: p.inStock,
      specifications: parseSpecs(p.specifications),
    }));
  } catch (error) {
    console.error("Error fetching products from SQLite:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const p = await prisma.product.findUnique({
      where: { id },
    });

    if (!p) return undefined;

    return {
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      inStock: p.inStock,
      specifications: parseSpecs(p.specifications),
    };
  } catch (error) {
    console.error(`Error fetching product #${id} from SQLite:`, error);
    return undefined;
  }
}
