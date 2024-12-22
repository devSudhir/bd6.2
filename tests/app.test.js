const { describe } = require('node:test');
const { app, getAuthors, getAuthorById, addNewAuthor } = require('../index.js');
let http = require('http');

jest.mock('../index.js');

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(
    ('Should return list of authors available',
    () => {
      const mockAuthors = [
        {
          authorId: 1,
          book: '1984',
          name: 'Gorge',
        },
        {
          authorId: 2,
          book: 'The great gatsby',
          name: 'F. Scott Fitzgerald',
        },
      ];

      getAuthors.mockReturnValue(mockAuthors);

      let result = getAuthors();
      expect(result).toEqual(mockAuthors);
    })
  );
});
