const form = document.getElementById("blog-form");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");

// Check url to see if we're editing a blog or creating a new one
// /blog vs /blog/:id/edit
const pathnames = location.pathname.split("/");
// Pop the last path so that the blog id can be accessed easily later
const editMode = pathnames.pop() === "edit";

// Helper function for getting data ready for xhr request
const getBody = () => {
  const title = titleEl.value;
  const text = textEl.value;
  return JSON.stringify({
    title,
    text,
  });
};

// HOF using closures to return a function based on whether we're in edit mode or create mode
const formHandler = () => {
  // Get the id of the blog - will return undefined if in create mode
  const id = pathnames.pop();

  // Event handler for edit mode
  const saveChanges = async e => {
    e.preventDefault();
    const body = getBody();
    const params = {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`/api/blog/${id}`, params);
    if (res.ok) {
      location.href = "/dashboard";
    } else {
    }
  };

  // Event handler for create mode
  const submit = async e => {
    e.preventDefault();
    const body = getBody();
    const params = {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/blog", params);
    if (response.ok) {
      location.href = `/dashboard`;
    } else {
    }
  };

  return editMode ? saveChanges : submit;
};

// Run the form handler to get back appropriate event handler
form.addEventListener("submit", formHandler());
