const baseApiUrl = "http://localhost:8080/api";

export async function customFetch<ResponseType = Response>(
  url: string,
  options?: RequestInit
) {
  const response = await fetch(`${baseApiUrl}/${url}`, {
    credentials: "include",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const contentLength = response.headers.get("Content-Length");

  if (!contentLength || +contentLength === 0) return response;
  return response.json() as ResponseType;
}
