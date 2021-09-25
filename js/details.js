// javascript for details.html
const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".details");
const deleteBtn = document.querySelector(".delete-button");

const url = "http://localhost:3000/posts";

const renderDetail = async (url) => {
  const res = await fetch(url + `/${id}`);
  const post = await res.json();

  const template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    `;

  container.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderDetail(url));
deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await fetch(url + `/${id}`, {
    method: "DELETE",
  });
  window.location.replace("/index.html");
});
