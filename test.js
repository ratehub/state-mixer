const test = require('tape');
const mix = require('.');

test('should create a single instance in the base case', assert => {
  assert.plan(1);
  const create = () => 42;
  assert.deepEqual(mix(create),
    [42]);
});


test('should create one of each instance for create args', assert => {
  assert.plan(3);
  const create = n => n;
  assert.deepEqual(mix(create, {createArgs: [[]]}),
    [undefined]);
  assert.deepEqual(mix(create, {createArgs: [[0]]}),
    [0]);
  assert.deepEqual(mix(create, {createArgs: [[0], [1]]}),
    [0, 1]);
});


test('should apply combinations actions', assert => {
  assert.plan(3);
  const create = () => 42;
  const inc = n => n + 1;
  const dec = n => n - 1;
  const zer = () => 0;
  assert.deepEqual(mix(create, {actions: [inc]}),
    [42, 43]);
  assert.deepEqual(mix(create, {actions: [inc, dec]}),
    [42, 43, 41, 42]);
  assert.deepEqual(mix(create, {actions: [zer, inc, dec]}),
    [42, 0, 43, 41, 1, -1, 42, 0]);
});
