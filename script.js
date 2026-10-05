// Import functions from storage.js
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

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.innerHTML = user;
    userSelect.appendChild(option);
  });
}

// selecting users from the dropdown
userSelect.addEventListener("change", e => {
  currentUser = e.target.value;
  const userData = getData(currentUser) || [];

  if (userData.length === 0) {
    msg.textContent = "Sorry, no saved bookmarks for the selected user."

    bookmarksContainer.style.display = "none";
    bookmarkForm.style.display = "block"
    return;
  }
  
  msg.textContent = "";
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
          <p>Created: ${bookmark.timeStamp}</p>

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
window.like = like;
window.deleteBookmark = deleteBookmark;
window.copy = copy;
