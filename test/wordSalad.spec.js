'use strict';

const wordSalad = require('../lib/wordSalad');
const expect = require('chai').expect;

describe('word-salad', () => {
  describe('nextID', () => {
    it('should issue varying identifier strings', () => {
      const id = wordSalad.nextID();
      expect(id).to.be.a.string;
      expect(id).to.have.length.above(0);
      expect(wordSalad.nextID()).not.to.equal(id);
    });
  });

  describe('fromInt', () => {
    it('should map from integers', () => {
      const id = wordSalad.fromInt(101);
      expect(id).to.be.a.string;
    });
    it('should return null for invalid numeric values', () => {
      expect(wordSalad.fromInt(0b11111111111111111111111111111111)).to.be.null;
    });
  });

  describe('toInt', () => {
    it('should map to integers', () => {
      const id = wordSalad.toInt('wordy wendigo');
      expect(id).to.be.an.integer;
    });
    it('should return NaN for invalid strings', () => {
      expect(wordSalad.toInt('noun noun')).to.be.NaN;
    });
  });

  it('should preserve end-to-end identity', () => {
    const id = Math.floor(0.25 * wordSalad.range());
    const words = wordSalad.fromInt(id);
    const wordid = wordSalad.toInt(words);
    expect(wordid).to.equal(id);
  });

  it("should report it's internal parameter count", () => {
    expect(wordSalad.paramCount()).to.be.a.number;
  });

  it('should produce a random identifier', () => {
    expect(wordSalad.mkID()).to.be.a.string;
  });
});

