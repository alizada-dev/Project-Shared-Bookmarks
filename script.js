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
const toast = document.querySelector("#snackbar");

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
    return;
  }

  msg.textContent = "";
  bookmarksContainer.style.display = "block";

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
      `❤️ ${bookmark.likes || 0}`;

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
  addBookmark();
});


// Adding a new bookmark
function addBookmark() {
  if (!currentUser) {
    alert("Please select a user before adding a bookmark.");
    return;
  }

  const bookmarks = getData(currentUser) || [];

  // Pushing the new bookmark to the storage
  bookmarks.push({
    siteName: siteTitle.value,
    siteDesc: siteDesc.value,
    siteUrl: siteUrl.value,
    likes: 0,
    createTime: Date.now(),
    timeStamp: new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  // Saving the new bookmark
  setData(currentUser, bookmarks);

  toast.className = "show";
  toast.textContent = "Bookmark added successfully!";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);

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

  toast.className = "show";
  toast.textContent = "Bookmark URL copied to clipboard!";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}


// Delete function
function deleteBookmark(createTime) {
  const bookmarks = getData(currentUser) || [];
  const updatedBookmarks = bookmarks.filter(
    (bookmark) => bookmark.createTime !== createTime,
  );

  if (window.confirm("Are you sure you want to delete this bookmark?")) {
    toast.className = "show";
    toast.textContent = "Bookmark deleted successfully!";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  
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
}

window.onload = function () {
  loadUsers();
};
