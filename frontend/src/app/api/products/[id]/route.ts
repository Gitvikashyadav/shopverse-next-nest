
import { NextResponse } from "next/server";
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_API_URL || "http://localhost:5000/graphql";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const query = `mutation DeleteProduct($id: String!) {
      deleteProduct(id: $id)
    }`;

    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { id } }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }

    return NextResponse.json({ success: json.data.deleteProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product", detail: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();

    const query = `mutation UpdateProduct($input: UpdateProductInput!) {
      updateProduct(updateProductInput: $input) {
        id slug name price oldPrice category image badge description
      }
    }`;

    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { input: { id, ...body } } }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }

    return NextResponse.json(json.data.updateProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product", detail: String(error) },
      { status: 500 }
    );
  }
}