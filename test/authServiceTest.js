const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../models/User");
const AuthService = require("../services/AuthService");

describe("auth service", function () {
  it("should throw an error if user doesnt exist", function (done) {
    const service = new AuthService({});
    sinon.stub(User, "findOne");
    User.findOne.returns(null);
    service.loadUser().catch(err => expect(err).to.be.an('error'));
    User.findOne.restore();
    done();
  })
  it('should throw an error if user already exists', function (done) {
    const service = new AuthService({});
    sinon.stub(User, 'findOne');
    User.findOne.returns(true);
    service.saveUser().catch(err => expect(err).to.be.an('error'));
    User.findOne.restore();
    done();
  })
})