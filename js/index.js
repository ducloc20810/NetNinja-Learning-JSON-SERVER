// javascript for index.html
const blogs = document.querySelector(".blogs");
window.addEventListener("DOMContentLoaded", (e) => renderPage());
const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderPage(searchForm.term.value.trim());
});

// func
const fetchPosts = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) throw new Error("Cannot fetch data from server");

  const data = await response.json();
  return data;
};

function renderPost(posts) {
  const blogs = document.querySelector(".blogs");
  let template = ``;
  if (Array.isArray(posts)) {
    posts.forEach((post) => {
      template += `
        <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>       
            <p>${post.body.slice(0, 200)}</p>
            <a href="./details.html?id=${[post.id]}">read more...</a>
            </div>
        `;
    });
  } else {
    const post = posts;
    template += `
        <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>       
            <p>${post.body.slice(0, 200)}</p>
            <a href="./details.html?id=${[post.id]}">read more...</a>
            </div>
        `;
  }

  blogs.innerHTML = template;
}

const renderPage = (term) => {
  let url = "http://localhost:3000/posts?_sort=likes&_order=desc";

  if (term) {
    url += `&q=${term}`;
  }

  fetchPosts(url)
    .then((data) => renderPost(data))
    .catch((error) => console.log(error));
  console.log(url);
};
