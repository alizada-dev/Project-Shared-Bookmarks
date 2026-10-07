import { getUserIds, getData, setData, clearData } from "./storage.js";

describe("storage utilities", () => {
  const userId = "test-user";
  const key = `stored-data-user-${userId}`;

  beforeEach(() => {
    localStorage.clear();
  });

  test("getUserIds returns five users", () => {
    const ids = getUserIds();
    expect(Array.isArray(ids)).toBe(true);
    expect(ids.length).toBe(5);
  });

  test("setData and getData persist data using localStorage", () => {
    const data = [{ id: 1, siteName: "a" }];
    setData(userId, data);
    const raw = localStorage.getItem(key);
    expect(raw).not.toBeNull();
    const out = getData(userId);
    expect(out).toEqual(data);
  });

  test("clearData removes stored data", () => {
    setData(userId, [{ id: 2 }]);
    expect(getData(userId)).not.toBeNull();
    clearData(userId);
    expect(getData(userId)).toBeNull();
  });
});
