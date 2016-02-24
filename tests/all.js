'use strict';

const test = require('tape');
const concat = require('../lib').concat;
const head = require('../lib').head;
const tail = require('../lib').tail;
const last = require('../lib').last;
const init = require('../lib').init;
const map = require('../lib').map;
const reduce = require('../lib').reduce;
const filter = require('../lib').filter;
const compose = require('../lib').compose;
const composeAll = require('../lib').composeAll;

const id = x => x;
const simple = [1, 2, 3];

test('concat: duplicate lists', assert => {
  assert.deepEqual(concat(simple, simple), [1, 2, 3, 1, 2, 3], 'duplicates an array');
  assert.end();
});
test('concat: empty lists', assert => {
  assert.deepEqual(concat([], []), [], 'remains empty');
  assert.end();
});

test('head: gets first element of list', assert => {
  assert.equal(head(simple), 1, 'remains empty');
  assert.equal(head([]), undefined, 'no head for empty list');
  assert.end();
});

test('tail: gets last elements of list', assert => {
  assert.deepEqual(tail(simple), [2, 3], 'return remaining elements');
  assert.end();
});

test('last: gets last element of list', assert => {
  assert.equal(last(simple), 3, 'remains empty');
  assert.equal(last([]), undefined, 'no head for empty list');
  assert.end();
});

test('init: gets last elements of list', assert => {
  assert.deepEqual(init(simple), [1, 2], 'return remaining elements');
  assert.deepEqual(init([]), [], 'no head for empty list');
  assert.end();
});


test('head: gets first element of list', assert => {
  assert.equal(head(simple), 1, 'remains empty');
  assert.equal(head([]), undefined, 'no head for empty list');
  assert.end();
});

test('tail: gets last elements of list', assert => {
  assert.deepEqual(tail(simple), [2, 3], 'return remaining elements');
  assert.end();
});


test('map: identity map', assert => {
  assert.deepEqual(map(id, []), [], 'maps an empty object');
  assert.deepEqual(map(id, simple), simple, 'identity map');
  assert.notEqual(map(id, simple), simple, 'maped result is a new array');
  assert.end();
});

test('map: null map ', assert => {
  assert.deepEqual(map(() => null, [1, 2, 3]), [null, null, null], 'should return a array of nulls');
  assert.end();
});

test('reduce: sum reducer', assert => {
  assert.deepEqual(reduce((a, b) => a + b, 0, [1, 2, 3]), 6, 'sum all elements');
  assert.end();
});

test('filter: filter odds', assert => {
  assert.deepEqual(filter(x => x % 2 === 0, [1, 2, 3, 4]), [2, 4], 'return only odds elements');
  assert.deepEqual(filter(x => x % 2 !== 0, [1, 2, 3, 4]), [1, 3], 'return only uneven elements');
  assert.deepEqual(filter(x => x % 5 === 0, [1, 2, 3, 4]), [], 'filter all elements');
  assert.end();
});

test('compose', assert => {
  const sum3 = x => x + 3;
  const mult2 = x => x * 2;
  const fg = compose(sum3, mult2);
  assert.ok(fg(3), 6, 'compose result');
  assert.ok(fg(3), mult2(sum3(3)), 'compose result');
  assert.end();
});

test('compose all', assert => {
  const sum3 = x => x + 3;
  const mult2 = x => x * 2;
  const mult5 = x => x * 5;
  const fg = composeAll([sum3, mult2, mult5]);
  const fg2 = composeAll([mult5, mult2, sum3]);
  assert.ok(fg(3), 15, 'compose result');
  assert.ok(fg(3), mult5(mult2(sum3(3))), 'compose result');
  assert.ok(fg2(3), sum3(mult2(mult5(3))), 'compose result');
  assert.end();
});

