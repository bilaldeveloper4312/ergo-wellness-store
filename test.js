const query = `
  query {
    product(id: "70", idType: DATABASE_ID) {
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
`;

fetch('http://backend.getergowellness.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
.then(r => r.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(console.error);
