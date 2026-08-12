import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_API_URL || "http://localhost:5000/graphql";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") || 0);
  const take = Number(searchParams.get("take") || 10);

  try {
    const query = `query GetUsers($skip: Int, $take: Int) {
      users(skip: $skip, take: $take) {
        users { id name email role createdAt }
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
    console.log("jhon dataaa ",json.data.users);

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    return NextResponse.json(json.data.users);
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users", detail: String(error) }, { status: 500 });
  }
}