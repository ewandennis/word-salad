'use strict';

const wordSalad = require('../lib/wordSalad');
const expect = require('chai').expect;

describe('word-salad', () => {
  it('should issue identifier strings', () => {
    const id = wordSalad.nextID();
    expect(id).to.be.a.string;
    expect(id).to.have.length.above(0);
  });

  it('should map from integers', () => {
    const id = wordSalad.fromInt(101);
    expect(id).to.be.a.string;
  });

  it('should map to integers', () => {
    const id = wordSalad.toInt('wordy wendigo');
    expect(id).to.be.an.integer;
  });
});
