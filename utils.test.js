import { likeBookmark } from "./utils";

describe("likeBookmark", () => {
    test("The likeBookmark function increments the likes of the selected bookmark", () => {
        const bookmarks = [
            {
                siteName: "Google",
                createTime: 1000,
                likes: 2,
            },
            {
                siteName: "YouTube",
                createTime: 2000,
                likes: 5,
            },
        ];

        const result = likeBookmark(bookmarks, 1000);

        expect(result[0].likes).toBe(3);
        expect(result[1].likes).toBe(5);
    })
});

describe("likeBookmark", () => {
    test("Using this function sets likes to 1 when bookmark has no likes value", () => {
        const bookmarks = [
            {
                siteName: "Shopify",
                createTime: 1000
            }
        ];

        const result = likeBookmark(bookmarks, 1000);

        expect(result[0].likes).toBe(1);
    })
})