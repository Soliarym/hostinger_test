import { getProducts } from "@/app/products/data";

export async function GET() {
  const products = await getProducts();
  return Response.json({
    success: true,
    data: products,
  });
}
