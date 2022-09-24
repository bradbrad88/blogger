const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = loginForm.querySelector("input[name='username']").value;
  const password = loginForm.querySelector("input[name='password']").value;
  const params = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("/api/auth/login", params);
  if (response.ok) {
    location.href = "/dashboard";
  }
});

signupForm.addEventListener("submit", async e => {
  e.preventDefault();
  const first_name = signupForm.querySelector("input[name='first_name']").value;
  const last_name = signupForm.querySelector("input[name='last_name']").value;
  const username = signupForm.querySelector("input[name='username']").value;
  const password = signupForm.querySelector("input[name='password']").value;
  const params = {
    method: "POST",
    body: JSON.stringify({ first_name, last_name, username, password }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("/api/auth/", params);
});
