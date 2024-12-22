const { describe } = require("node:test");
const { app, getAuthors, getAuthorById, addNewAuthor } = require("../index.js");
let http = require("http");

jest.mock("../index.js");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return list of authors available", () => {
    const mockAuthors = [
      {
        authorId: 1,
        book: "1984",
        name: "Gorge",
      },
      {
        authorId: 2,
        book: "The great gatsby",
        name: "F. Scott Fitzgerald",
      },
    ];

    getAuthors.mockReturnValue(mockAuthors);

    let result = getAuthors();
    expect(result).toEqual(mockAuthors);
    expect(getAuthors).toHaveBeenCalled();
  });

  test("getAuthorById should return a author details", () => {
    const mockAuthor = {
      authorId: 1,
      book: "1984",
      name: "Gorge",
    };

    getAuthorById.mockReturnValue(mockAuthor);
    const result = getAuthorById(1);
    expect(result).toEqual(mockAuthor);
    expect(getAuthorById).toHaveBeenCalledWith(1);
  });

  test("getAuthorById should return undefined on invalid author details", () => {
    const mockAuthor = undefined;
    getAuthorById.mockReturnValue(mockAuthor);

    const result = getAuthorById(90);
    expect(result).toEqual(mockAuthor);
    expect(getAuthorById).toHaveBeenCalledWith(90);
  });

  test("Add new author", () => {
    const newMockAuthor = {
      authorId: 4,
      book: "Harry Potter",
      name: "J.K.",
    };

    addNewAuthor.mockReturnValue(newMockAuthor);
    const result = addNewAuthor({
      book: "Harry Potter",
      name: "J.K.",
    });

    expect(result).toEqual(newMockAuthor);
    expect(addNewAuthor).toHaveBeenCalledWith({
      book: "Harry Potter",
      name: "J.K.",
    });
  });
});
