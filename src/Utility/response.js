async function handleResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error || data.message || "Request failed");

    Object.assign(error, {
      status: res.status,
      ...data,
    });

    throw error;
  }

  return data;
}
export { handleResponse };
