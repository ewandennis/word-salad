'use strict';

class IDGenerator {
  constructor() {
    const db = require('../corpora/sentiwordnet/db.json');
    this.adjectives = db.adjectives;
    this.nouns = db.nouns;
    this.seq = 0;
  }

  mkID() {
    return `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]} ${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;
  }

  nextID() {
    return ``; 
  }

  fromInt(n) {
    return 'spotty shaolin';
  }

  toInt(s) {
    return 1;
  }
}

const gen = new IDGenerator();

module.exports = gen;
