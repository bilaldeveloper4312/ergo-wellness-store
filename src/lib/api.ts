const API_URL = 'http://backend.getergowellness.com/graphql';

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
      cache: 'no-store', // Disable caching to ensure fresh data (search/variations)
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
export async function getAllProducts(search: string = "") {
  const data = await fetchAPI(`
    query AllProducts($search: String) {
      products(first: 20, where: { search: $search }) {
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
          ... on VariableProduct {
            price
            regularPrice
          }
        }
      }
    }
  `, {
    variables: { search: search || "" }
  });

  return data?.products?.nodes || [];
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string) {
  const data = await fetchAPI(`
    query GetProduct($id: ID!) {
      product(id: $id, idType: SLUG) {
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
        ... on VariableProduct {
          price
          regularPrice
          attributes {
            nodes {
              name
              options
            }
          }
          variations {
            nodes {
              id
              databaseId
              name
              price
              regularPrice
              attributes {
                nodes {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  `, {
    variables: {
      id: slug
    }
  });

  return data?.product || null;
}
