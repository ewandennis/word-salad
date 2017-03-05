'use strict';

function collapseBits(n, startbit) {
  let inbitidx = startbit;
  let outbitidx = 0;
  let acc = 0;
  while (inbitidx < 32) {
    acc |= (n & (1 << inbitidx)) >> (inbitidx - outbitidx);
    inbitidx += 2;
    outbitidx += 1;
    if (n >> outbitidx == 0) {
      break;
    }
  }
  return acc;
}

function expandBits(n, startbit) {
  let inbitidx = 0;
  let outbitidx = startbit;
  let acc = 0;
  while (outbitidx < 32) {
    acc |= (n & (1 << inbitidx)) << (outbitidx - inbitidx);
    inbitidx += 1;
    outbitidx += 2;
  }
  return acc;
}

module.exports = {
  fromOddBits: function (n) { return collapseBits(n, 0); },
  fromEvenBits: function (n) { return collapseBits(n, 1); },

  toOddBits: function(n) { return expandBits(n, 0); },
  toEvenBits: function(n) { return expandBits(n, 1); },

  fitValueInMask: function (n) {
    let mask = 0;
    for (let bitidx = 0; bitidx < 32; bitidx++) {
      mask |= 1<<bitidx;
      if (mask >= n) {
        break;
      }
    }
    return mask;
  }
};
