import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_API_URL || "http://localhost:3001/graphql";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  try {
    const query = `query GetProductsByCategory($category: String!) {
      productsByCategory(category: $category) {
        id
        slug
        name
        price
        oldPrice
        category
        image
        badge
        description
      }
    }`;

    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { category } }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }

    return NextResponse.json(json.data.productsByCategory);
  } catch (error) {
    console.error("Error fetching category products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", detail: String(error) },
      { status: 500 }
    );
  }
}