# Shared Bookmarks

Shared Bookmarks is a small browser-based app for saving and organising useful links. Select one of five users to view their bookmarks, add new links, and interact with saved bookmarks without needing an account or authentication.

## Features

- Select a user from the list of five available users.
- View that user's bookmarks in reverse chronological order.
- Add a bookmark with a title, URL, and description.
- Like bookmarks and persist their like counts.
- Copy a bookmark URL to the clipboard.
- Delete bookmarks.
- Keep bookmark data between browser sessions with `localStorage`.

Data is stored locally in the browser, so bookmarks are available only in the same browser profile and are not shared between different computers.

## Project structure

- `index.html` - application markup and the bookmark template.
- `script.js` - user interaction, rendering, and bookmark actions.
- `storage.js` - the provided `localStorage` data helpers.
- `utils.js` - reusable bookmark logic.
- `utils.test.js` - Jest unit tests for the bookmark logic.
- `style.css` - application styles.

## Getting started

### Prerequisites

- Node.js and npm

### Install dependencies

```bash
npm install
```

### Run the app locally

The app uses JavaScript modules, so it must be served over HTTP rather than opened directly with a `file://` URL. For example, run:

```bash
npx http-server .
```

Open the local URL shown in the terminal, then select a user to start viewing or adding bookmarks.

### Run the tests

```bash
npm test
```

## How data works

Each user's bookmarks are stored in `localStorage` under a user-specific key. Selecting a user loads their saved data, and creating, liking, or deleting a bookmark immediately updates that stored data and refreshes the list on screen.
