import https from "https";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';

export async function createOrderInWooCommerce(orderData: any) {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.error("Missing WooCommerce API Keys in environment variables");
    return { success: false, error: "Missing API Keys" };
  }

  const api = new WooCommerceRestApi({
    url: "https://backend.getergowellness.com",
    consumerKey: WC_CONSUMER_KEY,
    consumerSecret: WC_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true,
    axiosConfig: {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    }
  });

  try {
    const response = await api.post("orders", orderData);
    return { success: true, orderId: response.data.id, order: response.data };
  } catch (error: any) {
    console.error("WooCommerce API Exception:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}
