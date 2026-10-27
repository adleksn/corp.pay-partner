import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('page carries the corp.pay header and footer markup', () => {
  const html = read('index.html');

  assert.match(html, /class="site-header"/);
  assert.match(html, /class="site-footer"/);
  assert.match(html, /assets\/images\/header-logo\.webp/);
  assert.match(html, /assets\/images\/footer-logo\.png/);
});

test('mobile shell uses the corp.pay menu and hides the footer', () => {
  const css = read('styles.css');
  const script = read('script.js');

  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /\.site-footer\s*\{\s*display: none;/);
  assert.match(script, /is-menu-open/);
  assert.match(script, /mobileMenu\.hidden = !isOpen/);
});

test('hero preserves the partner-program copy and its authored line breaks', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="partner-hero"/);
  assert.match(html, /Клиенты — платят за нейросети<br>\s*Вы — получаете процент!/);
  assert.match(html, /Порекомендуйте нас один раз и получайте до 40%<br>\s*от нашей комиссии с каждого платежа клиента/);
  assert.match(css, /\.partner-hero\s*\{[\s\S]*?padding: 80px/);
  assert.match(css, /font-size: 48px/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.partner-hero/);
});
