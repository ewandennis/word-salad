'use strict';

/*
 * Translate between "adjective noun" pairs and 32-bit integers using the WordNet corpus.
 * The goal is to produce an encoding from integer to string which varies both adjective
 * and noun frequently over successive integer values. This variance is achieved by converting
 * the adjective and noun into integer offsets within the corpus, then mixing the indices
 * in interleaved manner into an integer. We have more nouns than adjectives so we use the
 * remaining high bits to store the remaining bits of the noun index.
 *
 * Example:
 *
 * "unlikely shark" -> 0b1100110010001000011110101101
 * Index of adjective "unlikely" = 10291 = 0b10100000110011
 * Index of noun "shark"         = 10910 = 0b10101010011110
 * Interleave 10291 with bottom 15 bits of 10910 = 0b00110010001000011110101101
 * Include the top 2 bits of 10 10910 (0b11) = 0b1100110010001000011110101101
 * "unlikely shark" = 214468525
 *
 */

const bitOps = require('./bignumbitops');
const bigNum = require('bignum');

// ASSUMPTION: #nouns > #adjectives
// ASSUMPTION: nounMask + adjMask <= 32
class IDGenerator {
  constructor() {
    const db = require('../corpora/sentiwordnet/db.json');
    this.adjectives = db.adjectives;
    this.nouns = db.nouns;
    this.seq = 0;
    this.adjMask = bigNum(bitOps.fitValueInMask(this.adjectives.length));
    this.adjMaskBits = bigNum(bitOps.highestSetBit(this.adjMask));
    this.lowMask = this.adjMask.or(this.adjMask.shiftLeft(this.adjMaskBits));
    const nounMask = bigNum(bitOps.fitValueInMask(this.nouns.length));
    this.nounUpperMask = nounMask.sub(this.adjMask);
  }

  range() {
    return this.adjectives.length * this.nouns.length;
  }

  paramCount() {
    return 2;
  }

  mkID() {
    return `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]} ${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;
  }

  nextID() {
    return this.fromInt(this.seq++); 
  }

  /*
   * Encode an "adjective noun" identifier into an integer using the WordNet corpus.
   * Input: "adjective noun" (string)
   * Output: integer or NaN if either word is not in our corpus
   *
   */
  toInt(s) {
    const words = s.split(/\s+/);
    const nounidx = bigNum(this.nouns.indexOf(words.slice(1).join(' ')));
    const adjidx = bigNum(this.adjectives.indexOf(words[0]));
    if (adjidx < 0 || nounidx < 0) {
      return NaN;
    }

    const nounupper = nounidx.and(this.nounUpperMask).shiftLeft(this.adjMaskBits);
    const nounlower = nounidx.and(this.adjMask);
    const nounnum = nounupper.or(bitOps.toEvenBits(nounlower));
    const n = nounnum.or(bitOps.toOddBits(adjidx)).toNumber();
    return n;
  }

  /*
   * Encode an integer into an "adject noun" pair using the WordNet corpus.
   *
   * Input: numeric identifier < this.range() (integer)
   * Output: "adjective noun" (string)
   */
  fromInt(n) {
    n = bigNum(n);
    const lowbits = n.and(this.lowMask);
    const adjidx = bitOps.fromOddBits(lowbits.toNumber());
    const nounlower = bitOps.fromEvenBits(lowbits);
    const nounupper = n.shiftRight(this.adjMaskBits).and(this.nounUpperMask);
    const nounidx = nounupper.or(nounlower).toNumber();
    if (adjidx >= this.adjectives.length || nounidx >= this.nouns.length) {
      return null;
    }

    const adj = this.adjectives[adjidx];
    const noun = this.nouns[nounidx];
    return adj + ' ' + noun;
  }
}

const gen = new IDGenerator();

module.exports = gen;
