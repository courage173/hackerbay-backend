import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import { createToken } from '../middlewares/token';

chai.use(chaiHttp);
const { expect } = chai;
const name = 'kolawole';
const token = createToken({ name });

describe("it should return successful", () => {
  it("it should successfully get all the logs", (done) => {
    chai.request(app)
      .get("/v1/logs")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res.text).to.be.an('string');
        done();
      });
  });
});
