'use strict';

// Build frequency tables of word counts. ie. how many 1, 2, 3, ... word nouns are in my corpus
const db = require('./corpora/sentiwordnet/db.json');
const adjectives = db.adjectives;
const nouns = db.nouns;

function countWords(phrase) {
  return phrase.trim().split(/\s+/).length;
}

function arrayFreq(arr) {
  const freq = {};
  arr.forEach(item => {
    if (!(item in freq)) {
      freq[item] = 0;
    }
    freq[item]++;
  });
  return freq;
}

function histo(hash) {
  return Object.keys(hash).map(k => `${k}: ${hash[k]}`).join(' ');
}

const adjWordCounts = arrayFreq(adjectives.map(countWords));
const nounWordCounts = arrayFreq(nouns.map(countWords));

console.log(`Adjective word counts: ${histo(adjWordCounts)}`);
console.log(`Noun word counts: ${histo(nounWordCounts)}`);
