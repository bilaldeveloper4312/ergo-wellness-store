'use server'

import { getAllProducts } from "@/lib/api";
import { createOrderInWooCommerce } from "@/lib/woocommerce";

export async function searchProductsAction(query: string) {
  if (!query) return [];
  // Call the WooCommerce API with the search query
  const products = await getAllProducts(query);
  return products;
}

export async function processCheckoutAction(orderPayload: any) {
  // Validate payload here if necessary
  
  // Send to WooCommerce
  const result = await createOrderInWooCommerce(orderPayload);
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result;
}
