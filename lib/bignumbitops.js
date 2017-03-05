'use strict';

const bigNum = require('bignum');
const zero = bigNum(0);
const one = bigNum(1);

function collapseBits(n, startbit) {
  let inbitidx = startbit;
  let outbitidx = 0;
  let acc = zero; 
  n = bigNum(n);
  while (inbitidx < 32) {
    acc = acc.or(n.and(one.shiftLeft(inbitidx)).shiftRight(inbitidx - outbitidx));
    //acc |= (n & (1 << inbitidx)) >> (inbitidx - outbitidx);
    inbitidx += 2;
    outbitidx += 1;
    if (n.shiftRight(outbitidx).eq(zero)) {
    //if (n >> outbitidx == 0) {
      break;
    }
  }
  return acc.toNumber();
}

function expandBits(n, startbit) {
  let inbitidx = 0;
  let outbitidx = startbit;
  let acc = zero;
  n = bigNum(n);
  while (outbitidx < 32) {
    acc = acc.or(n.and(one.shiftLeft(inbitidx)).shiftLeft(outbitidx - inbitidx));
    //acc |= (n & (1 << inbitidx)) << (outbitidx - inbitidx);
    inbitidx += 1;
    outbitidx += 2;
  }
  return acc.toNumber();
}

module.exports = {
  fromOddBits: function (n) { return collapseBits(n, 0); },
  fromEvenBits: function (n) { return collapseBits(n, 1); },

  toOddBits: function(n) { return expandBits(n, 0); },
  toEvenBits: function(n) { return expandBits(n, 1); },

  fitValueInMask: function (n) {
    let mask = zero;
    for (let bitidx = 0; bitidx < 32; bitidx++) {
      mask = mask.or(one.shiftLeft(bitidx));
      //mask |= 1<<bitidx;
      if (mask.cmp(n) >= 0) {
      //if (mask >= n) {
        break;
      }
    }
    return mask.toNumber();
  }
};
