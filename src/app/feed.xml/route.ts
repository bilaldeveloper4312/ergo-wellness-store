import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/api";

export async function GET() {
  const products = await getAllProducts();
  const baseUrl = "https://www.getergowellness.com";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>ErgoWellness Store</title>
    <link>${baseUrl}</link>
    <description>Premium Posture &amp; Ergonomic Solutions</description>
`;

  products.forEach((product: any) => {
    // Strip HTML from description
    const plainDescription = product.description
      ? product.description.replace(/<[^>]+>/g, "").substring(0, 5000)
      : "Premium ergonomic product from ErgoWellness.";

    // Use regular price if sale price not available (in WooCommerce, price is usually HTML or string, but GraphQL might return raw price)
    // WooCommerce GraphQL returns prices like "AED 39.99" or "£39.99". We need a clean number + currency.
    // Assuming USD for the feed if they are targeting US/UK, or we just pass the price string if it has currency.
    // For safety, let's just pass the raw price string or a default if missing.
    // Actually, GMC requires format like "39.99 USD".
    // Let's try to extract the number.
    let priceStr = product.price || product.regularPrice || "0";
    let numericPrice = priceStr.replace(/[^0-9.]/g, "");
    if (!numericPrice) numericPrice = "0.00";
    
    // We'll hardcode USD for now, as that's standard for US feeds.
    const priceFormatted = `${numericPrice} USD`;

    xml += `
    <item>
      <g:id>${product.databaseId || product.id}</g:id>
      <g:title>${product.name.replace(/&/g, "&amp;")}</g:title>
      <g:description>${plainDescription.replace(/&/g, "&amp;")}</g:description>
      <g:link>${baseUrl}/shop/${product.slug}</g:link>
      <g:image_link>${product.image?.sourceUrl || `${baseUrl}/hero-product.jpg`}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${priceFormatted}</g:price>
      <g:brand>ErgoWellness</g:brand>
    </item>
`;
  });

  xml += `
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
