const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://backend.getergowellness.com/graphql';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 10 }, // Revalidate every 10 seconds for ISR
    });

    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL Schema Errors:', json.errors);
      // Return empty data instead of crashing the whole Next.js app
      return null;
    }
    return json.data;
  } catch (error) {
    console.error('Error fetching GraphQL:', error);
    return null;
  }
}

// Fetch all WooCommerce products
export async function getAllProducts() {
  const data = await fetchAPI(`
    query AllProducts {
      products(first: 20) {
        nodes {
          id
          databaseId
          name
          slug
          description
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price
            regularPrice
          }
        }
      }
    }
  `);

  return data?.products?.nodes || [];
}

// Fetch a single product by ID (databaseId)
export async function getProductById(id: string) {
  const data = await fetchAPI(`
    query GetProduct($id: ID!) {
      product(id: $id, idType: DATABASE_ID) {
        id
        databaseId
        name
        slug
        description
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
        }
      }
    }
  `, {
    variables: {
      id: id
    }
  });

  return data?.product || null;
}
