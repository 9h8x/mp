export const prerender = false;
import { Buffer } from "node:buffer";
import type { APIRoute } from "astro";

const api_key = import.meta.env.JAP_API_KEY;
const api_url = import.meta.env.JAP_API_URL;

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");
    const name = url.searchParams.get("name");

    const response = await fetch(`${api_url}?key=${api_key}&action=services`, {
      method: "GET",
    });

    const data = await response.json();

    let filteredData = data.filter((item: any) => item.service); // Ensure service has a value

    if (category) {
      filteredData = filteredData.filter(
        (item: any) => item.category === category
      );
    }

    if (name) {
      filteredData = filteredData.filter((item: any) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Exclude services containing the words "prank" or "high drop"
    filteredData = filteredData.filter(
      (item: any) =>
        !item.name.toLowerCase().includes("prank") &&
        !item.name.toLowerCase().includes("high drop")
    );

    if (sort === "lp") {
      filteredData.sort(
        (a: any, b: any) => parseFloat(a.rate) - parseFloat(b.rate)
      );
    } else if (sort === "hp") {
      filteredData.sort(
        (a: any, b: any) => parseFloat(b.rate) - parseFloat(a.rate)
      );
    }

    return new Response(JSON.stringify(filteredData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch", details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
