// test/api.test.js
import { expect, use } from "chai";
import chaiJsonEqual from "chai-json-equal";
import axios from "axios";
import app from "../dist/server/server.js";

use(chaiJsonEqual);

let server;
describe("API Tests", () => {
  before(() => {
    // Start the server before all tests
    server = app.listen(3000, () => {
      console.log("server has started for testing.");
    });
  });

  after(() => {
    // Close the server after all tests
    server.close();
  });

  it("should return a hello message", async () => {
    const expectedResponse = {
      data: {
        CustomerID: "438b26d0-291c-4e5b-b037-68b214ed1709",
        Title: "",
        FirstName: "Michel",
        MiddleName: "",
        LastName: "Sterling",
        Suffix: "",
        PhoneNumber: "+19729006788",
        EmailAddress: "mjsterli@gmail.com",
        Brokerage: "Halo Realty"
      }
    };

    const response = await axios.get(
      "http://localhost:3000/api/customer/+19729006788"
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.jsonEqual(expectedResponse);
  });

  it("testing existing customer", async () => {});
});
