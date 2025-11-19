const supertest = require("supertest"); //supertest is a testing library that lets you simulate HTTP
//  requests to your Express app without actually starting the server.
const app = require("./app");
const request = supertest(app); //“Create a test client called request that can send fake
//  HTTP requests to my Express app.”

describe("Endpoints respond to requests", () => {
  it('Returns data and status 200 on request to "/"', () => {
    return request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    });
  });
  it('Returns data and status 200 on request to "/"', () => {
    return request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    });
  });
  it('Returns data and status 200 on request to "/"', () => {
    return request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    });
  });
  it('Returns data and status 200 on request to "/"', () => {
    return request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    });
  });
  it('Returns data and status 200 on request to "/"', () => {
    return request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    });
  });
});
