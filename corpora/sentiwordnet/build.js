'use strict';

const fs = require('fs');
const readline = require('readline');
const adjectives = new Set();
const nouns = new Set();
const lines = readline.createInterface({ input: fs.createReadStream(process.argv[2]) });
 
function decodeWords(w) {
  return w.replace(/_/g, ' ');
}

lines.on('line', line => {
  // Parse file collecting adjectives and verbs
  if (line[0] === '#') {
    return;
  }

  const flds = line.split(/\t/);
  if (flds.length < 5) {
    return;
  }

  const partOfSpeech = flds[0];
  const posScore = parseFloat(flds[2]);
  const negScore = parseFloat(flds[3]);
  const synSetTerms = flds[4].split(' ').map(rec => rec.split('#')[0]);

  // Build json db
  if (partOfSpeech === 'a') {
    synSetTerms.map(term => adjectives.add(decodeWords(term)));
  }

  if (partOfSpeech === 'n') {
    synSetTerms.map(term => nouns.add(decodeWords(term)));
  }
});

lines.on('close', () => {
  fs.writeFileSync(process.argv[3], JSON.stringify({
    adjectives: [...adjectives],
    nouns: [...nouns]
  }));
});

