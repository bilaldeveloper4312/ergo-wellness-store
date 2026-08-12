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
      next: { revalidate: 15 }, // Blazing fast page loads, updates every 15s in background
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

// Fetch all WordPress posts
export async function getAllPosts() {
  const data = await fetchAPI(`
    query AllPosts {
      posts(first: 20) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  `);

  return data?.posts?.nodes || [];
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`
    query GetPost($id: ID!) {
      post(id: $id, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `, {
    variables: {
      id: slug
    }
  });

  return data?.post || null;
}
