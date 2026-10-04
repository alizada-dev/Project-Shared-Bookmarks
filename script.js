// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { clearData, getData, getUserIds, setData } from "./storage.js";

// Elements
const userSelect = document.querySelector(".select");
const bookmarksContainer = document.querySelector(".bookmarks-container");
const bookmarkForm = document.querySelector("#bookmarks-form");
const siteTitle = document.querySelector("#title");
const siteDesc = document.querySelector("#desc");
const siteUrl = document.querySelector("#url")
const msg = document.querySelector(".message");

// Global variables
let currentUser = null;

// Loading the users
function loadUsers() {
  const users = getUserIds();

  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user;
    option.innerHTML = user;
    userSelect.appendChild(option);
  })
}

// selecting users from the dropdown
userSelect.addEventListener("change", e => {
  currentUser = e.target.value;
  const userData = getData(currentUser) || [];

  if (userData.length === 0) {
    msg.textContent = "Sorry, no saved bookmark for the selected user."

    bookmarksContainer.style.display = "none";
    bookmarkForm.style.display = "block"
    return;
  }
  
  bookmarksContainer.style.display = "block";
  bookmarkForm.style.display = "block";
  
  displayBookmarks();
})

function displayBookmarks() {
  const bookmarks = getData(currentUser) || [];
  
  bookmarks.sort((a, b) => b.createTime - a.createTime)
  bookmarksContainer.innerHTML = "";
  bookmarksContainer.innerHTML = `<h2>Saved bookmarks</h2>`;

  bookmarks.forEach((bookmark, index) => {
    bookmarksContainer.innerHTML += `
      <div class="bookmark-details">
          <a href="${bookmark.siteUrl}">${bookmark.siteName}</a>
          <p>${bookmark.siteDesc}</p>
          <h3>${bookmark.timeStamp}</h3>

          <button onclick="like(${bookmark.createTime})">Like <span>${bookmark.likes}</span></button>

           <div>
            <button onclick="copy(${bookmark.createTime})">Copy</button>
            <button onclick="deleteBookmark(${bookmark.createTime})">Delete</button>
          </div>
      </div>
    `
  })
}

// Submit button
bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) return;
  addBookmark();
});

// Adding a new bookmark
function addBookmark() {
  if (!currentUser) return;

  const bookmarks = getData(currentUser) || [];

  // Pushing the new bookmark to the storage
  bookmarks.push({
    siteName: siteTitle.value,
    siteDesc: siteDesc.value,
    siteUrl: siteUrl.value,
    likes: 0,
    createTime: Date.now(),
    timeStamp: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  });

  // Saving the new bookmark
  setData(currentUser, bookmarks);

  // Clear the form
  siteTitle.value = "";
  siteDesc.value = "";
  siteUrl.value = "";

  bookmarksContainer.style.display = "block";

  // Display the new and old bookmarks
  displayBookmarks();
}

// Like function
function like(createTime) {
  const bookmarks = getData(currentUser) || [];

  const bookmark = bookmarks.find(
    (bookmark) => bookmark.createTime === createTime
  )

  bookmark.likes = bookmark.likes || 0;

  bookmark.likes++;
  
  setData(currentUser, bookmarks);

  displayBookmarks();
}

// Copy function
function copy(createTime) {
  const bookmarks = getData(currentUser) || [];

  const bookmark = bookmarks.find(
    (bookmark) => bookmark.createTime === createTime
  )

  navigator.clipboard.writeText(bookmark.siteUrl);

  alert("URL copied");
}

// Delete function
function deleteBookmark(createTime) {
  const bookmarks = getData(currentUser) || [];
  const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.createTime !== createTime)

  alert("Bookmark deleted!");
  
  setData(currentUser, updatedBookmarks);
  
  displayBookmarks()
}


window.onload = function () {
  loadUsers();
};
window.like = like;
window.deleteBookmark = deleteBookmark;
window.copy = copy;
