export async function get() {
  return new Response(JSON.stringify({ message: "Test API route working" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
