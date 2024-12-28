import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: import.meta.env.CLERK_SECRET_KEY,
});
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  try {
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Missing userId parameter" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const user = await clerkClient.users.getUser(userId);

    return new Response(
      JSON.stringify({
        metadata: user.privateMetadata,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
