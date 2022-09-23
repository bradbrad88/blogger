const deleteBtn = document.getElementById("delete");
const blogId = location.pathname.split("/").pop();

const deleteBlog = async () => {
  const params = { method: "DELETE" };
  const response = await fetch(`/api/blog/${blogId}`, params);
  if (response.ok) {
    location.href = "/dashboard";
  } else {
  }
};

// 2-step delete process, click and then confirm
// If no input for 3 seconds then revert to initial state
const confirmFunction = () => {
  // Use closure to hold state of confirmation
  let confirmed = false;
  return () => {
    if (confirmed) {
      deleteBlog();
    } else {
      confirmed = true;
      deleteBtn.innerText = "CONFIRM";
      setTimeout(() => {
        confirmed = false;
        deleteBtn.innerText = "Delete";
      }, 3000);
    }
  };
};

deleteBtn.addEventListener("click", confirmFunction());
