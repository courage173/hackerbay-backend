import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import { createToken } from '../middlewares/token';

chai.use(chaiHttp);
const { expect } = chai;
const name = 'kolawole';
const token = createToken({ name });


describe("fail when no url supplied", () => {
  it("it should return error when no image url specified", (done) => {
    chai.request(app)
      .post("/v1/image_thumbnail")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        imageUrl: ''
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No image url found');
        done();
      });
  });
});
describe("fail when invalid image url supplied", () => {
  it("it should return error when an invalid image url is supplied", (done) => {
    chai.request(app)
      .post("/v1/image_thumbnail")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jp'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('invalid image url');
        done();
      });
  });
});

describe("it should return conversion successful", () => {
  it("it should successfully convert the images to thumbnail", (done) => {
    chai.request(app)
      .post("/v1/image_thumbnail")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.thumbnail).to.be.an('object');
        done();
      });
  });
});
