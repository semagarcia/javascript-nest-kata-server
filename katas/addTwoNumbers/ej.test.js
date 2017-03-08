const chai = require('chai');
const expect = chai.expect;
const addTwoNumbers = require('./ej.js')

describe('addTwoNumbers', () => {
  it('shoud return 4', () => {
    expect(addTwoNumbers(2,2)).to.equal(4);
  });
  it('shoud return 5', () => {
    expect(addTwoNumbers(2,3)).to.equal(5);
  });
});

