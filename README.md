# Enums

[![Build Status](https://travis-ci.org/Jaredk3nt/enums.svg?branch=master)](https://travis-ci.org/Jaredk3nt/enums)

Functional enum implementation for JS based on [@rbuckton's enum proposal](https://github.com/rbuckton/proposal-enum).

## Install

```bash
npm install --save fun-enums
```

## Usage

```js
const { enums } = require('fun-enums');

// Default initialization
const weekdays = enums()("monday", "tuesday", "wednesday", "thursday", "friday");

weekdays.monday; // 0
weekdays.friday; // 4
```

> Enums are frozen and should not be mutated after initializing. To avoid allowing mutation custom enum values should not be objects of depths greater than 1.

## Initializers

`fun-enums` is built around "initializers" which allow you to change the behavior of how the enum is created. The default initalizer is `number` which sets the first enum value to 0 and increments each following by 1. `fun-enums` also exposes a `string` initializer which sets the value equal to the given enum name.

```js
const { enums, string, number } = require('fun-enums');
// Provide other initializers from the package like string
let colors = enums(string)('red', 'green', 'blue')
colors.red; // 'red'

colors = enums(number)('red', 'green', 'blue'); // number does not need to be specified as it is the default behavior
colors.red // 0
```

### Custom initializers

You can also provide your own custom initializers by passing in an initialization function to `enums`.

```js
const { enums } = require('fun-enums');

function capitalize(en, _prevValue) {
  return en.charAt(0).toUpperCase() + en.slice(1);
}

const colors = enums(capitalize)('red', 'green', 'blue');
colors.red; // 'Red'
```

Your initializer will be passed these arguments:

| arg | type | description |
| --- | ---- | ----------- |
| enum | string | the string value passed to the enum to be used as the key |
| prevValue | any | the value of the previous enum initialized. Used to increment enum values |

## Override syntax

In some cases you want a bit more control over the exact values on your enum. You can override the normal behavior of any given initializer by passing in an object rather than an array.

```js
const { enums } = require('fun-enums');

const colors = enums()({ red: '#f44242', green: '#27c65a', blue: '#003bff' });
colors.red; // '#f44242'
```

This allows you to give values when running a function may not be the best method for defining the enum. You can also "opt-in" to the initializer whenever you want even when overriding by giving a key `undefined`.

```js
const { enums, string } = require('fun-enums');

const names = enums(string)({ john: 'johnny', sarah: undefined, tim: 'timothy' });
names.sarah; // 'sarah'
names.tim; // 'timothy'
```

> Objects and Arrays are invalid types for enum values and will be overwritten by default behavior when found.

## Enums API

`fun-enums` follows a similar API as defined by @rbuckton's enums impementing `keys`, `values`, `entries`, `has`, `hasValue`, and `getName` on each enum object.

### `.keys()`

```js
const { enums } = require('fun-enums');

const colors = enums()('red', 'green', 'blue');
colors.keys(); // ['red', 'green', 'blue']
```

### `.values()`

```js
const { enums } = require('fun-enums');

const colors = enums()('red', 'green', 'blue');
colors.values(); // [0, 1, 2]
```

### `.entries()`

```js
const { enums } = require('fun-enums');

const colors = enums()('red', 'green', 'blue');
colors.entries(); // [['red', 0], ['green', 1], ['blue', 2]]
```

### `.has()`

```js
const { enums } = require('fun-enums');

const colors = enums()('red', 'green', 'blue');
colors.has('red'); // true
colors.has('purple'); // false
```

### `.hasValue()`

```js
const { enums } = require('fun-enums');

const colors = enums()('red', 'green', 'blue');
colors.hasValue(0); // true
colors.hasValue('red'); // false
```

### `.getName()`

```js
const { enums } = require('fun-enums');

const colors = enums()('red', 'green', 'blue');
colors.getName(0); // 'red'
colors.getName(99); // undefined
```
