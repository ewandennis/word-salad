'use strict';

const bigInt = require('big-integer');

function collapseBits(n, startbit) {
  let inbitidx = startbit;
  let outbitidx = 0;
  let acc = bigInt(0);
  n = bigInt(n);
  while (inbitidx < 32) {
    acc = acc.or(n.and(bigInt.one.shiftLeft(inbitidx)).shiftRight(inbitidx - outbitidx));
    //acc |= (n & (1 << inbitidx)) >> (inbitidx - outbitidx);
    inbitidx += 2;
    outbitidx += 1;
    if (n.shiftRight(outbitidx).isZero()) {
    //if (n >> outbitidx == 0) {
      break;
    }
  }
  return acc.toJSNumber();
}

module.exports = {
  oddBits: function (n) {
    return collapseBits(n, 0);
  },

  evenBits: function (n) {
    return collapseBits(n, 1);
  },

  fitValueInMask: function (n) {
    let mask = bigInt.zero;
    for (let bitidx = 0; bitidx < 32; bitidx++) {
      mask = mask.or(bigInt.one.shiftLeft(bitidx));
      //mask |= 1<<bitidx;
      if (mask.compare(n) >= 0) {
      //if (mask >= n) {
        break;
      }
    }
    return mask.toJSNumber();
  }
};
