export async function GET() {
  const body = `User-agent: *\nAllow: /`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}