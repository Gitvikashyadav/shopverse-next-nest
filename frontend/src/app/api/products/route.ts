

import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_API_URL || "http://localhost:5000/graphql";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  try {
    const query = search
      ? `query SearchProducts($input: SearchProductsInput!) {
          searchProducts(searchProductsInput: $input) {
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
        }`
      : `query GetProducts {
          products {
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

    const variables = search ? { input: { search } } : {};

    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "Failed to fetch products", details: json.errors },
        { status: 500 },
      );
    }

    const products = search ? json.data.searchProducts : json.data.products;

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const query = `mutation CreateProduct($input: CreateProductInput!) {
      createProduct(createProductInput: $input) {
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
      body: JSON.stringify({ query, variables: { input: body } }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "Failed to create product", details: json.errors },
        { status: 500 },
      );
    }

    return NextResponse.json(json.data.createProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product", detail: String(error) },
      { status: 500 },
    );
  }
}
