const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';
const API_URL = 'http://backend.getergowellness.com/wp-json/wc/v3';

export async function createOrderInWooCommerce(orderData: any) {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.error("Missing WooCommerce API Keys in environment variables");
    return { success: false, error: "Missing API Keys" };
  }

  const credentials = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("WooCommerce Order Error:", data);
      return { success: false, error: data.message || "Failed to create order" };
    }

    return { success: true, orderId: data.id, order: data };
  } catch (error: any) {
    console.error("WooCommerce API Exception:", error);
    return { success: false, error: error.message };
  }
}
