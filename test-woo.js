const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

async function testWooCommerce() {
  const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  const api = new WooCommerceRestApi({
    url: "http://backend.getergowellness.com",
    consumerKey: WC_CONSUMER_KEY,
    consumerSecret: WC_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
  });

  const orderData = {
    payment_method: "paypal",
    payment_method_title: "PayPal",
    set_paid: true,
    billing: {
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      address_1: "123 Test St",
      city: "Test City",
      state: "CA",
      postcode: "90210",
      country: "US"
    },
    line_items: [
      {
        product_id: 17,
        quantity: 1
      }
    ]
  };

  try {
    const response = await api.post("orders", orderData);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testWooCommerce();
