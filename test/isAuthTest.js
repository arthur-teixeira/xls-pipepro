const expect = require("chai").expect;
const isAuth = require("../helpers/isAuth");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

function createFakeRequest({ token }) {
  return {
    cookies: {
      token
    }
  }
}

describe('auth middleware', function () {
  it('should throw an error if token is not set', function () {
    const req = createFakeRequest({ token: null })
    expect(isAuth.bind(this, req, {}, () => { })).to.throw()
  })

  it('should set email property if token is valid', function () {
    const req = createFakeRequest({ token: 'asiudhawiuhdaisuhd' })
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ id: "aiosudaoisud" });
    isAuth(req, {}, () => { });
    expect(req).to.have.property("id");
    jwt.verify.restore();
  })
})