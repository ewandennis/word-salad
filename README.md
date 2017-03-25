# Word Salad

Human-centric unique identifers for use in place of numeric record locators, account IDs and so on.

# Installation
Install Word Salad module from NPM:
```bash
npm install word-salad --save
```

# Exploration
Output a random identifier:

```bash
mkWordSalad
```
That will return something like "jet typist" or "indefinable sugarloaf".

To do that programmatically:

```javascript
console.log(require('word-salad').mkID());
```

# Map From Existing Numeric Identifiers
```javascript
const wordSalad = require('word-salad');
const person = {id:101, name:'Sue'}
person.id = wordSalad.fromInt(person.id);
```

# Map To Numeric Identifiers
```javascript
const wordSalad = require('word-salad');
const person = {id:'inimical pizzicato', name:'Sue'}
person.id = wordSalad.toInt(person.id);
```

# Generate A Sequence of Identifiers

```javascript
const wordSalad = require('word-salad');
for(let i = 0; i < 100; ++i) {
  console.log(wordSalad.nextID());
}
```

