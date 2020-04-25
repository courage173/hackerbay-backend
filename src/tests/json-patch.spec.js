import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import { createToken } from '../middlewares/token';

chai.use(chaiHttp);
const { expect } = chai;
const name = 'kolawole';
const token = createToken({ name });

describe("fail when no token", () => {
  it("it should return no token found", (done) => {
    chai.request(app)
      .patch("/v1/json-patch")
      .set("Accept", "application/json")
      .send({
        jsonObject: {
          firstName: 'albert',
          PhoneNumbers: []
        },
        jsonPatchObject: [
          { op: "replace", path: "/firstName", value: "kolawole" }
        ]
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No token found');
        done();
      });
  });
});

describe("fail when last time of authentication is more than one hour", () => {
  it("it should return invalid token", (done) => {
    chai.request(app)
      .patch("/v1/json-patch")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbGEiLCJwYXNzd29yZCI6Im5mZGYiLCJpYXQiOjE1ODc3MzIzMzYsImV4cCI6MTU4NzczNTkzNn0.6CjatyGeybhQvZY8izragnWBx4IOPvRbRsAeSPZJH1M")
      .send({
        jsonObject: {
          firstName: 'albert',
          PhoneNumbers: []
        },
        jsonPatchObject: [
          { op: "replace", path: "/firstName", value: "kolawole" }
        ]
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('token is invalid');
        done();
      });
  });
});

describe("should fail when no jsonObject found", () => {
  it("it should return no json object found ", (done) => {
    chai.request(app)
      .patch("/v1/json-patch")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        jsonPatchObject: [
          { op: "replace", path: "/firstName", value: "kolawole" }
        ]
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('no json object found');
        done();
      });
  });
});

describe("should fail when no jsonPatchObject found", () => {
  it("it should return no jsonPatchObject patch ", (done) => {
    chai.request(app)
      .patch("/v1/json-patch")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        jsonObject: {
          firstName: 'albert',
          PhoneNumbers: []
        }
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('no jsonPatchObject object found');
        done();
      });
  });
});

describe("it should return successfull valid patched json response", () => {
  it("it should return invalid token", (done) => {
    chai.request(app)
      .patch("/v1/json-patch")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        jsonObject: {
          firstName: 'albert',
          PhoneNumbers: []
        },
        jsonPatchObject: [
          { op: "replace", path: "/firstName", value: "kolawole" }
        ]
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
