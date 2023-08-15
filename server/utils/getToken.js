export function getToken(request) {
  return (request.headers.authorization || "").replace(/Bearer\s?/, "") || null;
}