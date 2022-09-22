const logout = document.getElementById("logout");

logout.addEventListener("click", async () => {
  const params = {
    method: "POST",
  };
  const response = await fetch("/api/auth/logout", params);
  if (response.ok) {
    location.reload();
  }
});
