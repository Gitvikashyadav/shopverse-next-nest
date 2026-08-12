// import { api } from "@/lib/api";

// export async function generateDescription({ name, price, category = "" }) {
//   try {
//     const { description } = await api.generateDescription({ name, price, category });
//     return description;
//   } catch {
//     // Local placeholder until the AI endpoint is live
//     await new Promise((r) => setTimeout(r, 900));
//     return `Crafted with intent, the ${name} balances refined materials with everyday ease. ` +
//       `Clean lines, considered proportions and a finish that holds its shape season after season. ` +
//       `A quiet statement piece at $${price} — designed to be worn, not stored.`;
//   }
// }

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