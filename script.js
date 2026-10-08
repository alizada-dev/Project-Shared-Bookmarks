// Import functions from storage.js
import { getData, getUserIds, setData } from "./storage.js";
import { likeBookmark } from "./utils.js";

// Elements
const userSelect = document.querySelector(".select");
const bookmarksContainer = document.querySelector(".bookmarks-container");
const bookmarkForm = document.querySelector("#bookmarks-form");
const siteTitle = document.querySelector("#title");
const siteDesc = document.querySelector("#desc");
const siteUrl = document.querySelector("#url");
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
userSelect.addEventListener("change", (e) => {
  currentUser = e.target.value;
  const userData = getData(currentUser) || [];

  if (userData.length === 0) {
    msg.textContent = "Sorry, no saved bookmarks for the selected user.";

    bookmarksContainer.style.display = "none";
    bookmarkForm.style.display = "block";
    return;
  }

  msg.textContent = "";
  bookmarksContainer.style.display = "block";
  bookmarkForm.style.display = "block";

  displayBookmarks();
});

function displayBookmarks() {
  const bookmarks = getData(currentUser) || [];

  // Sorting the copy of the returned bookmarks; not mutating the original
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => b.createTime - a.createTime,
  );

  bookmarksContainer.innerHTML = `<h2>Saved bookmarks</h2>`;

  sortedBookmarks.forEach((bookmark) => {
    const bookmarkTemplate = document
      .getElementById("bookmark-template")
      .content.cloneNode(true);

    bookmarkTemplate.querySelector(".bookmark-url").textContent =
      bookmark.siteName;
    bookmarkTemplate.querySelector(".bookmark-url").href = bookmark.siteUrl;

    bookmarkTemplate.querySelector(".description").textContent =
      bookmark.siteDesc;

    bookmarkTemplate.querySelector(".time-created").textContent =
      `Created: ${bookmark.timeStamp}`;

    bookmarkTemplate.querySelector(".like-count").textContent =
      `Likes: ${bookmark.likes || 0}`;

    // Like button
    bookmarkTemplate.querySelector(".likeBtn").addEventListener("click", () => {
      like(bookmark.createTime);
    });

    // Copy button
    bookmarkTemplate.querySelector(".copyBtn").addEventListener("click", () => {
      copy(bookmark.createTime);
    });

    // Delete button
    bookmarkTemplate
      .querySelector(".deleteBtn")
      .addEventListener("click", () => {
        deleteBookmark(bookmark.createTime);
      });

    // Adding bookmark to the page
    bookmarksContainer.append(bookmarkTemplate);
  });
}

// Submit button
bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) return;
  addBookmark();
});

// Adding a new bookmark
function addBookmark() {
  // If currentUser is empty/null/undefined/false, stop running this function
  if (!currentUser) return;

  const bookmarks = getData(currentUser) || [];

  // Pushing the new bookmark to the storage
  bookmarks.push({
    siteName: siteTitle.value,
    siteDesc: siteDesc.value,
    siteUrl: siteUrl.value,
    likes: 0,
    createTime: Date.now(),
    // create human-readable date
    timeStamp: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  });

  // Saving the new bookmark
  setData(currentUser, bookmarks);

  // Clear the form
  siteTitle.value = "";
  siteDesc.value = "";
  siteUrl.value = "";

  bookmarksContainer.style.display = "block";
  msg.textContent = "";

  // Display the new and old bookmarks
  displayBookmarks();
}

// Like function
function like(createTime) {
  const bookmarks = getData(currentUser) || [];

  const updatedBookmarks = likeBookmark(bookmarks, createTime);

  setData(currentUser, updatedBookmarks);
  displayBookmarks();
}

// Copy function
function copy(createTime) {
  const bookmarks = getData(currentUser) || [];

  const bookmark = bookmarks.find(
    (bookmark) => bookmark.createTime === createTime,
  );

  navigator.clipboard.writeText(bookmark.siteUrl);

  alert("URL copied");
}

// Delete function
function deleteBookmark(createTime) {
  const bookmarks = getData(currentUser) || [];
  const updatedBookmarks = bookmarks.filter(
    (bookmark) => bookmark.createTime !== createTime,
  );

  alert("Bookmark deleted!");

  setData(currentUser, updatedBookmarks);

  if (updatedBookmarks.length === 0) {
    bookmarksContainer.style.display = "none";
    msg.textContent = "Sorry, no saved bookmarks for the selected user.";
  } else {
    bookmarksContainer.style.display = "block";
    msg.textContent = "";
    displayBookmarks();
  }
}

window.onload = function () {
  loadUsers();
};
