const form = document.getElementById("comment-form");
const comment = document.getElementById("comment-input");
const id = location.pathname.split("/").pop();
if (form)
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const content = comment.value;
    const response = await fetch(`/api/blog/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      location.reload();
    } else {
      // Handle comment fail
    }
  });
