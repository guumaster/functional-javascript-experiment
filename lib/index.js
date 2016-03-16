'use strict';

const slice = (xs, ...args) => [].slice.apply(xs, args);

const concat = (xs, ys) => [].concat.call(xs, ys);

const len = xs => xs.length;

const isEmpty = xs => !len(xs);

const head = xs => xs[0];

const tail = xs => slice(xs, 1);

const last = xs => head(slice(xs, -1));

const init = xs => slice(xs, 0, len(xs) - 1);

const take = (m, xs) => slice(xs, 0, m);

const reduce = (fn, acc, xs) => isEmpty(xs) ? acc : reduce(fn, fn(acc, head(xs)), tail(xs));

const map = (fn, xs) => isEmpty(xs) ? xs : reduce((acc, x) => concat(acc, [fn(x)]), [], xs);

const filter = (fn, xs) => isEmpty(xs) ? xs : reduce((acc, x) => (fn(x) ? concat(acc, [x]) : acc), [], xs);

const drop = (fn, xs) => filter(x => !fn(x), xs);

const best = (fn, xs) => isEmpty(xs) ? xs : reduce((prev, next) => fn(prev, next) ? prev : next, xs[0], xs);

const compose = (f, g) => xs => f(g(xs));

const composeAll = fns => reduce((f, g) => xs => f(g(xs)), head(fns), tail(fns));

const pipe = (f, g) => compose(g, f);

const pipeAll = fns => composeAll(fns.reverse());

const partition = (fn, xs) => reduce((acc, x) => (fn(x) ? acc[0].push(x) : acc[1].push(x), acc), [[], []], xs);

const every = (fn, xs) => reduce((acc, x) => acc && fn(x), true, xs);

const any = (fn, xs) => reduce((acc, x) => fn(x) || acc, false, xs);

module.exports = { map, concat, head, tail, reduce, filter, drop, compose, pipe, composeAll, pipeAll, last, init, take, best, partition, every, any };

