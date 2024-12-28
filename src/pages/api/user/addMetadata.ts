import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: import.meta.env.CLERK_SECRET_KEY,
});
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userId, metadata } = await request.json();

    if (!userId || !metadata) {
      return new Response(
        JSON.stringify({ error: "Missing userId or metadata" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get current metadata
    const user = await clerkClient.users.getUser(userId);
    const currentMetadata = user.privateMetadata || {};

    // Merge new metadata with existing metadata
    const updatedMetadata = {
      ...currentMetadata,
      ...metadata,
    };

    // Update with merged metadata
    await clerkClient.users.updateUser(userId, {
      privateMetadata: updatedMetadata,
    });

    return new Response(
      JSON.stringify({
        success: true,
        metadata: updatedMetadata,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating metadata:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update metadata" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
