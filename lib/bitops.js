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

module.exports = {
  oddBits: function (n) {
    return collapseBits(n, 0);
  },

  evenBits: function (n) {
    return collapseBits(n, 1);
  },

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
