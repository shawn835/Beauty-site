const apiUrl = import.meta.env.VITE_API_URL;

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${apiUrl}/blogs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch blogs");
    }

    let data = await response.json();
    return data.map((blog) => ({
      ...blog,
      imageDisplay: `${apiUrl}${blog.imageDisplay}`, // Ensure correct image URL
    }));
  } catch (error) {
    console.error("Fetch error:", error.message);
    return []; // Ensure components using fetchBlogs don't break
  }
};
