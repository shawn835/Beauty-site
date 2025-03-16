// src/components/Blogs/fetchBlogs.js
export const fetchBlogs = async (apiUrl) => {
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
      imageDisplay: `${apiUrl}${blog.imageDisplay}`,
    }));
  } catch (error) {
    console.error("Fetch error:", error.message);
    return [];
  }
};
