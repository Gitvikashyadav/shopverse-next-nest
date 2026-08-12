import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_API_URL || "http://localhost:5000/graphql";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") || 0);
  const take = Number(searchParams.get("take") || 10);

  try {
    const query = `query GetOrders($skip: Int, $take: Int) {
      orders(skip: $skip, take: $take) {
        orders {
          id
          customerName
          customerEmail
          items { productId name image price qty }
          address { name phone address city state pincode }
          amount
          method
          paymentId
          status
          createdAt
        }
        total
      }
    }`;

    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { skip, take } }),
      cache: "no-store",
    });

    const json = await res.json();
    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 },
      );
    }

    return NextResponse.json(json.data.orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const query = `mutation PlaceOrderInput($input: CreateOrderInput!) {
      PlaceOrderInput(PlaceOrderInput: $input) {
        id status createdAt
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
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    return NextResponse.json(json.data.createOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order", detail: String(error) },
      { status: 500 },
    );
  }
}
