// Generate Unique ID
export function generateID() {
  return Math.floor(Math.random() * 1000000);
}

export const handleSubmitBlog = async (blog, apiUrl, toast) => {
  try {
    const formData = new FormData();
    Object.keys(blog.value).forEach((key) => {
      if (key === "meta") {
        formData.append("meta", JSON.stringify(blog.value.meta));
      } else if (key === "tags") {
        formData.append("tags", JSON.stringify(blog.value.tags));
      } else {
        formData.append(key, blog.value[key]);
      }
    });

    if (blog.value.image) {
      formData.append("image", blog.value.image);
    }

    if (blog.value.postImages.length > 0) {
      blog.value.postImages.forEach((file) => {
        formData.append("postImages", file);
      });
    }

    const response = await fetch(`${apiUrl}/api/admin/post-blog`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json(); // Parse server response

    if (!response.ok) throw new Error(data.error || "Failed to post blog");

    toast.success("Blog posted successfully!");
  } catch (error) {
    toast.error(error.message);
  }
};
