'use strict';

const bitops = require('../lib/bitops');
const expect = require('chai').expect;

describe('Bit integer bit operations', () => {
  describe('fromOddBits', () => {
    it('should collapse odd bits', () => {
      expect(bitops.fromOddBits(0b0001)).to.equal(0b0001);
      expect(bitops.fromOddBits(0b0010)).to.equal(0b0000);
      expect(bitops.fromOddBits(0b0011)).to.equal(0b0001);
      expect(bitops.fromOddBits(0b0100)).to.equal(0b0010);
      expect(bitops.fromOddBits(0b0101)).to.equal(0b0011);
      expect(bitops.fromOddBits(0b0110)).to.equal(0b0010);
      expect(bitops.fromOddBits(0b0111)).to.equal(0b0011);
      expect(bitops.fromOddBits(0b1000)).to.equal(0b0000);
    });
  });
  describe('fromEvenBits', () => {
    it('should collapse even bits', () => {
      expect(bitops.fromEvenBits(0b0001)).to.equal(0b0000);
      expect(bitops.fromEvenBits(0b0010)).to.equal(0b0001);
      expect(bitops.fromEvenBits(0b0011)).to.equal(0b0001);
      expect(bitops.fromEvenBits(0b0101)).to.equal(0b0000);
      expect(bitops.fromEvenBits(0b0110)).to.equal(0b0001);
      expect(bitops.fromEvenBits(0b0111)).to.equal(0b0001);
      expect(bitops.fromEvenBits(0b1000)).to.equal(0b0010);
      expect(bitops.fromEvenBits(0b1010)).to.equal(0b0011);
    });
  });
  describe('toOddBits', () => {
    it('should expand into odd bits', () => {
      expect(bitops.toOddBits(0b0000)).to.equal(0b00000000);
      expect(bitops.toOddBits(0b0001)).to.equal(0b00000001);
      expect(bitops.toOddBits(0b0010)).to.equal(0b00000100);
      expect(bitops.toOddBits(0b0011)).to.equal(0b00000101);
      expect(bitops.toOddBits(0b0100)).to.equal(0b00010000);
      expect(bitops.toOddBits(0b0101)).to.equal(0b00010001);
      expect(bitops.toOddBits(0b0110)).to.equal(0b00010100);
      expect(bitops.toOddBits(0b0111)).to.equal(0b00010101);
      expect(bitops.toOddBits(0b1000)).to.equal(0b01000000);
    });
  });
  describe('toEvenBits', () => {
    it('should expand into event bits', () => {
      expect(bitops.toEvenBits(0b0000)).to.equal(0b00000000);
      expect(bitops.toEvenBits(0b0001)).to.equal(0b00000010);
      expect(bitops.toEvenBits(0b0010)).to.equal(0b00001000);
      expect(bitops.toEvenBits(0b0011)).to.equal(0b00001010);
      expect(bitops.toEvenBits(0b0100)).to.equal(0b00100000);
      expect(bitops.toEvenBits(0b0101)).to.equal(0b00100010);
      expect(bitops.toEvenBits(0b0110)).to.equal(0b00101000);
      expect(bitops.toEvenBits(0b0111)).to.equal(0b00101010);
      expect(bitops.toEvenBits(0b1000)).to.equal(0b10000000);
    });
  });
  describe('End-to-end', () => {
    it('should preserve identity through odd xform', () => {
      for (let i = 0; i < 0b1111; i++) {
        expect(bitops.fromOddBits(bitops.toOddBits(i))).to.equal(i);
      }
    });
    it('should preserve identity through even xform', () => {
      for (let i = 0; i < 0b1111; i++) {
        expect(bitops.fromEvenBits(bitops.toEvenBits(i))).to.equal(i);
      }
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

