# State Mixer

Mix up some states

[![Build Status](https://travis-ci.org/ratehub/state-mixer.svg?branch=master)](https://travis-ci.org/ratehub/state-mixer)
[![View on npm](https://img.shields.io/npm/v/state-mixer.svg)](https://www.npmjs.com/package/state-mixer)


```js
// here's some interesting object
class ValueUsageMonitor {
    constructor(initial) {
        this._value = initial || 0;
        this.writes = 0;
        this.reads = 0;
    }

    set value(v) {
        this.writes += 1;
        this._value = v;
    }

    get value() {
        this.reads += 1;
        return this._value;
    }
}


// now lets get copies of it in interesting different states (for, say, tests)

import mix from 'state-mixer';

const create = initial =>
    new ValueUsageMonitor(initial);

const createArgs = [
    [],
    [0],
    [1],
];

const read = vum => { vum.value; return vum; };
const inc = vum => { vum.value += 1; return vum; };
const set0 = vum => { vum.value = 0; return vum; };

mix(create, { createArgs, actions: [read, inc, set0] });
// returns:
// [
//    ValueUsageMonitor [_value=0, reads=0, writes=0]
//    ValueUsageMonitor [_value=0, reads=1, writes=0]
//    ValueUsageMonitor [_value=0, reads=1, writes=1]
//    ValueUsageMonitor [_value=0, reads=0, writes=1]
//    ValueUsageMonitor [_value=1, reads=2, writes=1]
//    ...
// ]
```
