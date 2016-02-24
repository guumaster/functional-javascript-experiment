'use strict';

const slice = (xs, ...args) => [].slice.apply(xs, args);

const concat = (xs, ys) => [].concat.call(xs, ys);

const isEmpty = xs => !xs.length;

const head = xs => xs[0];

const tail = xs => slice(xs, 1);

const last = xs => head(slice(xs, -1));

const init = xs => slice(xs, 0, length(xs) - 1);

const length = xs => xs.length;

const take = (m, xs) => slice(xs, 0, m);

const reduce = (fn, acc, xs) => isEmpty(xs) ? acc : reduce(fn, fn(acc, head(xs)), tail(xs));

const map = (fn, xs) => isEmpty(xs) ? xs : reduce((acc, x) => concat(acc, [fn(x)]), [], xs);

const filter = (fn, xs) => isEmpty(xs) ? xs : reduce((acc, x) => (fn(x) ? concat(acc, [x]) : acc), [], xs);

const compose = (f, g) => xs => f(g(xs));

const composeAll = fns => reduce((f, g) => xs => f(g(xs)), head(fns), tail(fns));

module.exports = { map, concat, head, tail, reduce, filter, compose, composeAll, last, init, take, len: length };

