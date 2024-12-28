import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/blue");
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
