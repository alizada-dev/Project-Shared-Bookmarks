# Testing Checklist

This document explains how we checked that Shared Bookmarks meets the project rubric.

## Rubric checks

### 1. The website lists five users

1. Opened the app.
2. Opened the user selector.
3. Confirmed that it contains exactly five user options: `1`, `2`, `3`, `4`, and `5`.

**Result:** All five users were available to select.

### 2. Selecting a user displays that user's bookmarks

1. Selected a user with saved bookmarks.
2. Confirmed that the bookmarks shown belonged to the selected user.
3. Selected a different user.
4. Confirmed that the list changes to the second user's data.

**Result:** The page displayed data for the currently selected user only.

### 3. Users with no bookmarks see an explanatory message

1. Selected a user with no saved bookmarks, and cleared a user's local storage first.
2. Checked the area below the user selector.

**Result:** The message `Sorry, no saved bookmarks for the selected user.` was displayed.

### 4. Bookmarks are shown in reverse chronological order

1. Added two or more bookmarks for the same user at different times.
2. Refreshed the page and selected that user.
3. Compared the displayed order with the creation times.

**Result:** The newest bookmark appeared first and the oldest appeared last.

### 5. Each bookmark shows its title, description, and creation time

1. Selected a user with bookmarks.
2. Inspected every displayed bookmark.

**Result:** Each bookmark contained a title, description, and `Created:` date.

### 6. Each bookmark title links to its URL

1. Added a bookmark with a known URL, such as `https://google.com`.
2. Selected the title link.

**Result:** The link pointed to the URL saved with that bookmark and opened in a new browser tab.

### 7. Copy buttons copy the correct URL

1. Selected a user with a bookmark.
2. Clicked that bookmark's `Copy to Clipboard` button.
3. Pasted into a text field or browser address bar.

**Result:** The pasted text is the URL belonging to the selected bookmark, and a confirmation alert is shown.

### 8. Like counters work independently and persist

1. Added or selected at least two bookmarks.
2. Clicked the like button for only the first bookmark.
3. Confirmed that only its count increases.
4. Clicked the same like button again and confirmed that its count increased again.
5. Refreshed the page or closed and reopened the browser.
6. Selected the same user again.

**Result:** Each bookmark has an independent counter, and its count is preserved after reopening the app.

### 9. The form contains URL, title, description, and submit controls

1. Selected a user.
2. Inspected the form.
3. Confirmed that it contained fields for site title, description, and site URL, plus a submit button.
4. Left a required field empty and submitted.

**Result:** All required fields are present, and the browser prevents submission when a required field is empty or the URL is invalid.

### 10. Submitting the form adds a bookmark for the selected user

1. Selected user `1`.
2. Completed the form with a unique title, description, and valid URL.
3. Submitted the form.
4. Selected user `2`.
5. Checked that the new bookmark is not shown for user `2`.
6. Selected user `1` again.

**Result:** The new bookmark is stored for user `1` only.

### 11. The updated list includes a newly created bookmark

1. Selected a user.
2. Submitted a valid new bookmark.
3. Observed the bookmark list without refreshing.

**Result:** The new bookmark appears immediately in the list, with a like count of zero.

### 12. The website is accessible

Ran Lighthouse in Chrome DevTools:

1. Opened the app in Chrome.
2. Opened DevTools and selected the **Lighthouse** panel.
3. Selected **Snapshot** mode and the **Accessibility** category.
4. Generated a report while no user is selected.
5. Repeated with a user who had no bookmarks.
6. Repeated with a user who had bookmarks and the form visible.

**Result:** Every tested view scores 100 for Accessibility, with no critical issues for labels, controls, headings, links, or keyboard navigation.

Also test keyboard access manually by using `Tab`, `Shift+Tab`, `Enter`, and the keyboard to complete and submit the form.

### 13. Unit tests are included and pass

Run:

```bash
npm test
```

The unit tests are in [utils.test.js](utils.test.js). They test the non-trivial `likeBookmark` function by checking that:

- The selected bookmark's like count increments without changing other bookmarks.
- A bookmark without a like count starts at one when liked.

**Result:** Jest reports one passing test suite and two passing tests.

## Additional feature checks

These checks cover implemented behavior that is useful to verify even though it is not a separate rubric item:

### Deleting bookmarks

1. Select a user with multiple bookmarks and delete one.
2. Confirm that the remaining bookmarks stay visible.
3. Delete the final bookmark.

**Result:** The deleted bookmark disappears, and the empty-state message appears only after the final bookmark is removed.

### Persistence per browser

1. Add a bookmark for a user.
2. Refresh the page and select the same user.
3. Select another user and confirm their data is separate.

**Result:** Data persists in the same browser profile and is isolated by user.
