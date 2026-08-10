const query = `
  mutation {
    __schema {
      mutationType {
        fields {
          name
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
.then(d => {
  if(d.data && d.data.__schema && d.data.__schema.mutationType) {
    console.log(d.data.__schema.mutationType.fields.map(f => f.name).filter(n => n.includes('checkout') || n.includes('order')));
  } else {
    console.log(d);
  }
})
.catch(console.error);
