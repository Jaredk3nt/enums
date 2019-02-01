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
const weekdays = enums()(["monday", "tuesday", "wednesday", "thursday", "friday"]);

weekdays.monday; // 0
weekdays.friday; // 4
```

> Enums are frozen and should not be mutated after initializing

## Initializers

Enums is built around "initializers" which allow you to change the behavior of how the enum is created. The default initalizer is `number` which sets the first enum value to 0 and increments each following by 1. Enums also exposes a `string` initializer which sets the value equal to the given enum name.

```js
const { enums, string, number } = require('fun-enums');
// Provide other initializers from the package like string
let colors = enums(string)(['red', 'green', 'blue'])
colors.red; // 'red'

colors = enums(number)(['red', 'green', 'blue']); // number does not need to be specified as it is the default behavior
colors.red // 0
```

### Custom initializers

You can also provide your own custom initializers by passing in an initialization function to enums.

```js
const { enums } = require('fun-enums');

function capitalize(en, _prevValue) {
  return en.charAt(0).toUpperCase() + en.slice(1);
}

const colors = enums(capitalize)(['red', 'green', 'blue']);
colos.red; // 'Red'
```

Your initializer will be passed these arguments:

| arg | type | description |
| --- | ---- | ----------- |
| enum | string | the string value passed to the enum to be used as the key |
| prevValue | any | the value of the previous enum initialized. Used to increment enum values |
