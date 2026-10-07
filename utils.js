
export function likeBookmark(bookmarks, createTime) {
    const bookmark = bookmarks.find(
        (bookmark) => bookmark.createTime === createTime
    );

    if (!bookmark) return bookmarks;

    bookmark.likes = bookmark.likes || 0;
    bookmark.likes++;

    return bookmarks;
}