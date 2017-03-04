'use strict';

const bitops = require('../lib/bitops');
const expect = require('chai').expect;

describe('Bit operations', () => {
  describe('oddBits', () => {
    it('should collapse odd bits', () => {
      expect(bitops.oddBits(0b0000000000000001)).to.equal(0b1);
      expect(bitops.oddBits(0b0000000000000010)).to.equal(0b0);
      expect(bitops.oddBits(0b0000000000000011)).to.equal(0b1);
      expect(bitops.oddBits(0b0000000000000100)).to.equal(0b10);
      expect(bitops.oddBits(0b0000000000000101)).to.equal(0b11);
      expect(bitops.oddBits(0b0000000000000110)).to.equal(0b10);
      expect(bitops.oddBits(0b0000000000000111)).to.equal(0b11);
      expect(bitops.oddBits(0b0000000000001000)).to.equal(0b0);
    });
  });
  describe('evenBits', () => {
    it('should collapse even bits', () => {
      expect(bitops.evenBits(0b0000000000000001)).to.equal(0b0);
      expect(bitops.evenBits(0b0000000000000010)).to.equal(0b1);
      expect(bitops.evenBits(0b0000000000000011)).to.equal(0b1);
      expect(bitops.evenBits(0b0000000000000101)).to.equal(0b0);
      expect(bitops.evenBits(0b0000000000000110)).to.equal(0b1);
      expect(bitops.evenBits(0b0000000000000111)).to.equal(0b1);
      expect(bitops.evenBits(0b0000000000001000)).to.equal(0b10);
      expect(bitops.evenBits(0b0000000000001010)).to.equal(0b11);
    });
  });
  describe('fitValueInMask', () => {
    it('should produce the smallest bitmask over the given value', () => {
      expect(bitops.fitValueInMask(0b1)).to.equal(0b1);
      expect(bitops.fitValueInMask(0b11)).to.equal(0b11);
      const maskNines = bitops.fitValueInMask(9999);
      expect(9999 & maskNines).to.equal(9999);
    });
  });
});

