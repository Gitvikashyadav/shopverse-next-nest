// const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql";

// export async function gql(query, variables = {}) {
//   const response = await fetch(GRAPHQL_ENDPOINT, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query, variables }),
//   });

//   const result = await response.json();

//   if (result.errors) {
//     // Throw the first error's message so calling code can catch/display it
//     throw new Error(result.errors[0]?.message || "GraphQL request failed");
//   }

//   return result.data;
// } 

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  "http://localhost:5000/graphql";

function getTenantDomain() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.location.hostname;
}

export async function gql(query, variables = {}) {
  const tenantDomain = getTenantDomain();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      // Send current client's domain to NestJS
      ...(tenantDomain && {
        "X-Tenant-Domain": tenantDomain,
      }),
    },

    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors[0]?.message ||
        "GraphQL request failed",
    );
  }

  return result.data;
}