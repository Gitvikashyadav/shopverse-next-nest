

"use client";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql";

export async function generateDescription({ name, price }) {
  const query = `mutation GenerateDescription($input: GenerateDescriptionInput!) {
    generateDescription(generateDescriptionInput: $input) {
      description
    }
  }`;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { input: { name, price: Number(price) } },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Failed to generate description");
  }

  return json.data.generateDescription.description;
}