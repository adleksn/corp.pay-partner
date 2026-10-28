import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

const createClassList = () => {
  const classes = new Set();
  return {
    add: (...names) => names.forEach((name) => classes.add(name)),
    remove: (...names) => names.forEach((name) => classes.delete(name)),
    contains: (name) => classes.has(name),
    toggle: (name, force) => {
      if (force === false) classes.delete(name);
      else classes.add(name);
    },
  };
};

const runPageScript = ({ reducedMotion = false } = {}) => {
  const section = { classList: createClassList() };
  const messages = Array.from({ length: 7 }, () => ({ classList: createClassList() }));
  const scheduled = [];
  let observerCallback;
  let observedTarget;

  class FakeIntersectionObserver {
    constructor(callback) {
      observerCallback = callback;
    }

    observe(target) {
      observedTarget = target;
    }

    disconnect() {}
  }

  const document = {
    querySelector(selector) {
      if (selector === '.objections') return section;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '.objections__row') return messages;
      return [];
    },
    getElementById() {
      return null;
    },
  };

  const window = {
    IntersectionObserver: FakeIntersectionObserver,
    matchMedia: () => ({ matches: reducedMotion }),
    setTimeout(callback, delay) {
      scheduled.push({ callback, delay });
    },
  };

  vm.runInNewContext(script, {
    document,
    window,
    IntersectionObserver: FakeIntersectionObserver,
  });

  return { section, messages, scheduled, observerCallback, observedTarget };
};

test('objection messages reveal in sequence every 300 ms after entering the viewport', () => {
  const page = runPageScript();

  assert.equal(page.observedTarget, page.section);
  assert.ok(page.section.classList.contains('is-animated'));
  assert.ok(page.observerCallback);

  page.observerCallback([{ isIntersecting: true }]);
  assert.deepEqual(page.scheduled.map(({ delay }) => delay), [0, 300, 600, 900, 1200, 1500, 1800]);

  page.scheduled.forEach(({ callback }) => callback());
  assert.ok(page.messages.every(({ classList }) => classList.contains('is-visible')));
});

test('reduced motion shows all objection messages immediately', () => {
  const page = runPageScript({ reducedMotion: true });

  assert.equal(page.observerCallback, undefined);
  assert.equal(page.scheduled.length, 0);
  assert.ok(page.messages.every(({ classList }) => classList.contains('is-visible')));
});
