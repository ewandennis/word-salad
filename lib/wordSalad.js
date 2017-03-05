'use strict';

const bitOps = require('./bignumbitops');

class IDGenerator {
  constructor() {
    const db = require('../corpora/sentiwordnet/db.json');
    this.adjectives = db.adjectives;
    this.nouns = db.nouns;
    this.seq = 0;
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
    return this.fromInt(this.seq); 
  }

  fromInt(n) {
    // mask off odd bits for adjective
    // mask off event bits for noun
    const mask = bitOps.fitValueInMask(this.adjectives.length * this.nouns.length);
    n = n % mask;
    const adjidx = bitOps.oddBits(n);
    const nounidx = bitOps.evenBits(n);
    const adj = this.adjectives[adjidx % this.adjectives.length];
    const noun = this.nouns[nounidx % this.nouns.length];
    return adj + ' ' + noun;
  }

  toInt(s) {
    return 1;
  }
}

const gen = new IDGenerator();

module.exports = gen;
