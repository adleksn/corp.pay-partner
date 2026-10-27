import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('page carries the corp.pay header and footer markup', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="site-header"/);
  assert.match(html, /class="site-footer"/);
  assert.match(html, /assets\/images\/header-logo\.webp/);
  assert.match(html, /assets\/images\/footer-logo\.png/);
  assert.match(css, /font-family: "Futura PT Book"/);
  assert.match(css, /\.button\s*\{[\s\S]*?justify-content: center/);
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

test('why-start section preserves the Pen card data and responsive layout', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="why-start"/);
  assert.match(html, /Почему стоит начать сейчас/);
  assert.match(html, /53%/);
  assert.match(html, /₽ 357 млрд/);
  assert.match(html, /\+68% в год/);
  assert.match(html, /Сегодня клиенты уже тратят свои деньги на нейросети и зарубежные сервисы\.<br>/);
  assert.match(css, /\.why-start\s*\{[\s\S]*?padding: 88px 80px/);
  assert.match(css, /\.why-start__cards\s*\{[\s\S]*?height: 220px/);
  assert.match(css, /\.why-start__card\s*\{[\s\S]*?border-radius: 20px/);
  assert.match(css, /\.why-start h2\s*\{[^}]*font-size: 40px/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.why-start__cards\s*\{[\s\S]*?flex-direction: column/);
  assert.match(css, /\.partner-hero__cta button:hover[^{]*\{[\s\S]*?#68186a/);
});

test('how-it-works section preserves all four Pen steps and its mobile timeline', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="how-it-works"/);
  assert.match(html, /Как это работает/);
  assert.match(html, /Становитесь партнёром/);
  assert.match(html, /Привести клиента — удобно/);
  assert.match(html, /Клиент работает напрямую/);
  assert.match(html, /Получаете вознаграждение/);
  assert.match(css, /\.how-it-works\s*\{[\s\S]*?padding: 88px 80px/);
  assert.match(css, /\.how-it-works__steps\s*\{[\s\S]*?gap: 32px/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.how-it-works__steps\s*\{[\s\S]*?flex-direction: column/);
  assert.match(css, /\.how-it-works__step:not\(:last-child\) .how-it-works__number::after/);
});

test('partner-status section preserves three tiers, benefits, and source footnotes', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="partner-status"/);
  assert.match(html, /Чем выше статус, тем больше вознаграждение/);
  assert.match(html, /Базовый/);
  assert.match(html, /Золотой/);
  assert.match(html, /Платиновый/);
  assert.match(html, /20%/);
  assert.match(html, /30%/);
  assert.match(html, /40%/);
  assert.match(html, /\*Статус присваивается при выполнении обоих условий/);
  assert.match(css, /\.partner-status\s*\{[^}]*padding: 88px 80px/);
  assert.match(css, /\.partner-status__cards\s*\{[^}]*width: 1280px/);
  assert.match(css, /\.partner-status__card--platinum\s*\{[^}]*linear-gradient\(90deg, #cc5fce 0%, #a32a8d 100%\)/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.partner-status__cards\s*\{[^}]*flex-direction: column/);
});
