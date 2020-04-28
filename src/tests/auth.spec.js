import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe("login should fail", () => {
  it("it should fail when no username is supplied", (done) => {
    chai.request(app)
      .post("/v1/login")
      .set("Accept", "application/json")
      .send({
        username: "",
        password: "pedro123"
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});

describe("login should fail", () => {
  it("it should fail when no password is supplied", (done) => {
    chai.request(app)
      .post("/v1/login")
      .set("Accept", "application/json")
      .send({
        username: "",
        password: "pedro123"
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});

describe("login should fail", () => {
  it("it should fail when no password is supplied", (done) => {
    chai.request(app)
      .post("/v1/login")
      .set("Accept", "application/json")
      .send({
        username: "kola123",
        password: ""
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});

describe("it should login successfully", () => {
  it("it should take any username and password and login", (done) => {
    chai.request(app)
      .post("/v1/login")
      .set("Accept", "application/json")
      .send({
        username: "courageosemwengie@gmail.com",
        password: "pedro123"
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.token).to.be.a('string');
        done();
      });
  });
});
