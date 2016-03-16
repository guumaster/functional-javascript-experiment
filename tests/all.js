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
const pipe = require('../lib').pipe;
const pipeAll = require('../lib').pipeAll;
const best = require('../lib').best;
const partition = require('../lib').partition;
const drop = require('../lib').drop;
const every = require('../lib').every;
const any = require('../lib').any;

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

test('drop: filter evens', assert => {
  assert.deepEqual(drop(x => x % 2 === 0, [1, 2, 3, 4]), [1, 3], 'return only odds elements');
  assert.deepEqual(drop(x => x % 2 !== 0, [1, 2, 3, 4]), [2, 4], 'return only even elements');
  assert.deepEqual(drop(x => x % 5 === 0, [1, 2, 3, 4]),  [1, 2, 3, 4], 'dont drop any elements');
  assert.end();
});
test('compose', assert => {
  const sum3 = x => x + 3;
  const mult2 = x => x * 2;
  const fg = compose(sum3, mult2);
  assert.equal(fg(3), sum3(mult2(3)), 'compose two functions');
  assert.end();
});

test('compose all', assert => {
  const sum3 = x => x + 3;
  const mult2 = x => x * 2;
  const mult5 = x => x * 5;
  const fg = composeAll([sum3, mult2, mult5]);
  const fg2 = composeAll([mult5, mult2, sum3]);
  assert.equal(fg(3), sum3(mult2(mult5(3))), 'compose three functions');
  assert.equal(fg2(3), mult5(mult2(sum3(3))), 'compose three functions in differnt order');
  assert.end();
});


test('pipe', assert => {
  const sum3 = x => x + 3;
  const mult2 = x => x * 2;
  const fg = pipe(sum3, mult2);
  assert.equal(fg(3), mult2(sum3(3)), 'compose two functions');
  assert.end();
});

test('pipe all', assert => {
  const sum3 = x => x + 3;
  const mult2 = x => x * 2;
  const mult5 = x => x * 5;
  const fg = pipeAll([sum3, mult2, mult5]);
  const fg2 = pipeAll([mult5, mult2, sum3]);
  assert.equal(fg(3), mult5(mult2(sum3(3))), 'compose three functions');
  assert.equal(fg2(3), sum3(mult2(mult5(3))), 'compose three functions in differnt order');
  assert.end();
});

test('best number', assert => {
  const max = 5;
  const arr = [1,2,3,4,5];
  const maxFn = (a, b) => a > b;

  assert.equal(best(maxFn, arr), max, 'get the best number');
  assert.end();

});


test('best word', assert => {
  const max = 'longest';
  const arr = ['short', 'longest', 'small'];
  const longestFn = (a, b) => a.length > b.length;

  assert.equal(best(longestFn, arr), max, 'get the longest word');
  assert.end();

});

test('partition odd', assert => {
  const arr = [1,2,3,4,5,6];
  const splitter = item => item % 2 === 0;

  assert.deepEqual(partition(splitter, arr), [[2,4,6], [1,3,5]], 'split odds numbers');
  assert.end();

});

test('every', assert => {
  const arr1 = [1,2,3,4,5,6];
  const arr2 = [-1, 3, 5];
  const arr3 = [1, 0];
  const pred = item => item > 0;

  assert.equal(every(pred, arr1), true, 'all elements greater than 0');
  assert.equal(every(pred, arr2), false, 'not all elements greater than 0');
  assert.equal(every(pred, arr3), false, 'not all elements greater than 0');
  assert.end();

});


test('any', assert => {
  const arr1 = [1,2,3,4,5,6];
  const arr2 = [-1, 3, 5];
  const arr3 = [1, 0];
  const pred = item => item < 0;

  assert.equal(any(pred, arr1), false, 'no element less than 0');
  assert.equal(any(pred, arr2), true, 'no elements less than 0');
  assert.equal(any(pred, arr3), false, 'not all elements less than 0');
  assert.end();

});

