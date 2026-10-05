// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

const userSelect = document.querySelector(".select");

function loadUsers() {
  const users = getUserIds();

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.innerHTML = user;
    userSelect.appendChild(option);
  });
}

window.onload = function () {
  loadUsers();

  //allows to select a user and return associated value in object
  const selectUser = document.querySelector(".select");

  //listens for a selected user and displays their bookmarks.
  selectUser.addEventListener("change", (event) => {
    const selectedUser = event.target.value;
    displayBookmarks(selectedUser);
  });
};

//displays the bookmarks of a selected user on the site
function displayBookmarks(userId) {
  const user = `user${userId} `;
  console.log(`the user array has: ${user}`);
  const bookMarkSection = document.querySelector("#bookmarks");
  //bookMarkSection.innerHTML = "";

  const bookmarks = users[0].map(createBookmark);

  bookMarkSection.append(...bookmarks);
}

//we create a single instance of a bookmark
function createBookmark(bookMark) {
  const bookmark = document
    .getElementById("bookmark-template")
    .content.cloneNode(true);
  bookmark.querySelector("h2").textContent = bookMark.title;
  console.log(bookMark.title);
  bookmark.querySelector(".description").textContent = bookMark.description;
  bookmark.querySelector(".timeCreated").textContent = bookMark.timestamp;
  bookmark.querySelector("a").href = bookMark.URL;

  return bookmark;
}

const users = [
  [
    {
      userId: 1,
      title: "MDN resource",
      URL: "https://developer.mozilla.org/en-US/",
      description:
        "A useful resource for web developers, new and old. has learning materials and in depth explanations of HTML, CSS and JS topics",
      timestamp: "1/10/26 12:00",
    },
    {
      userId: 1,
      title: "W3Schools",
      URL: "https://www.w3schools.com/",
      description:
        "A quick reference site for web developers. With tutorials and in depth explanations of HTML, CSS and JS topics",
      timestamp: "12/09/26 17:00",
    },
  ],
  [],
  [],
  [],
  [],
];
