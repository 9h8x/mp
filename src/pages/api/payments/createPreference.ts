import { MercadoPagoConfig, Preference } from "mercadopago";

// Ensure the environment variable is loaded
const client = new MercadoPagoConfig({
  accessToken: import.meta.env.MP_ACCESS_TOKEN as string,
});

export async function POST({ locals, request }: { request: Request }) {
  try {
    const { userId } = locals.auth();

    if (!userId) {
      return new Response("Error: No signed in user", { status: 401 });
    }
    // Parse incoming request body
    const { title, quantity, unit_price } = await request.json();

    if (!unit_price || typeof unit_price !== "number" || unit_price <= 0) {
      throw new Error("Invalid unit_price provided");
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: title || "Default Product",
            quantity: quantity || 1,
            unit_price: unit_price,
          },
        ],
        back_urls: {
          success: `${import.meta.env.SITE}/payment/success`,
          failure: `${import.meta.env.SITE}/payment/failure`,
          pending: `${import.meta.env.SITE}/payment/pending`,
        },
        auto_return: "approved",
      },
    });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create preference", details: error }),
      {
        status: 500,
      }
    );
  }
}
