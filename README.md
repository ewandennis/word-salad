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
mkid
```
...will return something like "jet typist" or "indefinable sugarloaf".

# Mapping From Existing Numeric Identifiers
```javascript
const wordSalad = require('word-salad');
const person = {id:101, name:'Sue'}
person.id = wordSalad.fromInt(person.id);
```

Note: this is a naive and inefficient way to use word salad. Please consider using hints to maximise the space of potential identifiers.

# Mapping To Numeric Identifiers
```javascript
const wordSalad = require('word-salad');
const person = {id:'inimical pizzicato', name:'Sue'}
person.id = wordSalad.toInt(person.id);
```

Note: this is a naive and inefficient way to use word salad. Please consider using hints to maximise the space of potential identifiers.


