async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
}
export { handleResponse };
