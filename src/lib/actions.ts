'use server'

import { getAllProducts } from "@/lib/api";

export async function searchProductsAction(query: string) {
  if (!query) return [];
  // Call the WooCommerce API with the search query
  const products = await getAllProducts(query);
  return products;
}
