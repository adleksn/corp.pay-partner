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
  assert.match(css, /\.partner-hero\s*\{[^}]*linear-gradient\(135deg, #3e2063 0%, #503072 100%\)/);
  assert.match(css, /\.partner-hero__cta button\s*\{[^}]*height: 52px/);
  assert.match(css, /\.partner-hero__cta button\s*\{[^}]*font-family: "Futura PT", Arial, sans-serif/);
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
  assert.match(css, /\.why-start h2\s*\{[^}]*font-size: 36px/);
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
  assert.match(css, /\.partner-status__cards\s*\{[^}]*align-items: flex-start/);
  assert.match(css, /\.partner-status__card--platinum\s*\{[^}]*linear-gradient\(90deg, #a32a8d 0%, #cc5fce 100%\)/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.partner-status__cards\s*\{[^}]*flex-direction: column/);
});

test('status-lock section preserves the five-month source sequence', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="status-lock"/);
  assert.match(html, /Статус не снижается из-за одного слабого месяца/);
  for (const month of ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь']) assert.match(html, new RegExp(month));
  assert.match(html, /Платиновый статус зафиксирован на 3 месяца/);
  assert.match(html, /После повышения статус фиксируется на 3 месяца/);
  assert.match(css, /\.status-lock\s*\{[^}]*padding: 88px 80px/);
  assert.match(css, /\.status-lock__sequence\s*\{[^}]*width: 1280px/);
  assert.match(css, /\.status-lock__fixed\s*\{[^}]*background: #a32a8d1f/);
  assert.match(html, /class="status-lock__fixed-label"/);
  assert.match(css, /\.status-lock__sequence\s*\{[^}]*flex-direction: column/);
  assert.match(css, /\.status-lock__fixed-label\s*\{[^}]*margin: 0 0 0 586px/);
  assert.match(css, /\.status-lock__months\s*\{[^}]*gap: 10px/);
  assert.match(css, /\.status-lock__spacer\s*\{[^}]*height: 12px/);
  assert.match(html, /status-result status-result--base[\s\S]*?status-result__icon[\s\S]*?Базовый/);
  assert.match(html, /status-result status-result--platinum[\s\S]*?status-result__icon[\s\S]*?Платиновый/);
  assert.match(html, /status-result status-result--gold[\s\S]*?status-result__icon[\s\S]*?Золотой/);
  assert.match(css, /\.status-result--base\s*\{[^}]*background: #e6e0ec/);
  assert.match(css, /\.status-month--platinum\s*\{[^}]*linear-gradient\(90deg, #a32a8d 0%, #cc5fce 100%\)/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.status-lock__sequence\s*\{[^}]*flex-direction: column/);
});

test('mutual-benefits section preserves both audiences and shared benefits', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="mutual-benefits"/);
  assert.match(html, /Выгодно и вам, и клиенту/);
  assert.match(html, /До 40% вознаграждения/);
  assert.match(html, /Расходы отображены/);
  assert.match(html, /Удобно и вам, и клиенту/);
  assert.match(html, /Всё прозрачно/);
  assert.match(css, /\.mutual-benefits\s*\{[^}]*padding: 88px 80px/);
  assert.match(css, /\.mutual-benefits__audiences\s*\{[^}]*height: 448px/);
  assert.match(css, /\.mutual-benefits__panel--partner\s*\{[^}]*background: #741b75/);
  assert.match(html, /class="benefit-icon benefit-icon--headset"[\s\S]*?M3 14h3a2 2 0 0 1 2 2v5H5/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.mutual-benefits__audiences\s*\{[^}]*flex-direction: column/);
  assert.match(html, /<circle cx="12" cy="12" r="2"><\/circle>/);
  assert.match(html, /<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"><\/path>/);
  assert.match(html, /M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8/);
});

test('objections section preserves the source chat dialogue and responsive chat window', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="objections"/);
  assert.match(html, /Частые возражения/);
  assert.match(html, /Рекомендуйте нас клиентам и получайте до 40% нашей комиссии с их платежей/);
  assert.match(html, /Клиенты и так платят сами/);
  assert.match(html, /Клиенту это лишние хлопоты и ещё один подрядчик/);
  assert.match(html, /Мы платим своей картой, и всё работает/);
  assert.match(html, /Как подключиться\? Оставить заявку/);
  assert.match(css, /\.objections\s*\{[^}]*padding: 88px 80px/);
  assert.match(css, /\.objections\s*\{[^}]*background: #ede3f4/);
  assert.match(css, /\.objections__chat\s*\{[^}]*align-self: center/);
  assert.match(css, /\.objections__chat\s*\{[^}]*width: 760px/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.objections__chat\s*\{[^}]*border-radius: 20px/);
  assert.match(css, /\.objections h2\s*\{[^}]*text-align: left/);
});

test('faq section opens the first question by default and preserves responsive accordions', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const script = read('script.js');

  assert.match(html, /class="faq"/);
  assert.match(html, /Частые вопросы/);
  for (const question of ['Как стать партнёром?', 'Кто может стать партнёром?', 'Как клиент закрепляется за мной?', 'Что если клиент уже работает с вами?', 'Как считается вознаграждение?']) assert.match(html, new RegExp(question.replaceAll('?', '\\?')));
  assert.match(css, /\.faq\s*\{[^}]*padding: 88px 80px/);
  assert.match(css, /\.faq\s*\{[^}]*background: #fff/);
  assert.match(css, /\.faq__list\s*\{[^}]*width: 860px/);
  assert.match(html, /data-faq-trigger/);
  assert.match(html, /class="faq__item is-open"[^>]*><button class="faq__question"[^>]*aria-expanded="true"[^>]*aria-controls="faq-answer-1"/);
  assert.match(html, /class="faq__answer" id="faq-answer-1"><span><\/span><span><\/span><\/div>/);
  assert.match(html, /id="faq-answer-5" hidden/);
  assert.match(css, /\.faq__item\.is-open \.faq__plus::after/);
  assert.match(script, /const faqTriggers = document\.querySelectorAll\('\[data-faq-trigger\]'\)/);
  assert.match(script, /answer\.hidden = !isOpen/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.faq__question\s*\{[^}]*font-size: 15px/);
});

test('partner application section preserves its source form and mobile stacking', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const script = read('script.js');

  assert.match(html, /class="partner-application"/);
  assert.match(html, /Станьте партнёром/);
  assert.match(html, /Оставьте контакт — менеджер напишет в течение рабочего дня, расскажет об условиях и пришлёт договор/);
  assert.match(html, /Договор через ЭДО/);
  assert.match(html, /Без вступительных платежей и обязательств по объёму/);
  assert.match(html, /Как к вам обращаться/);
  assert.match(html, /@username или email/);
  assert.match(html, /bpartner@pay-saas\.ru/);
  assert.match(css, /\.partner-application\s*\{[^}]*padding: 48px 80px/);
  assert.match(css, /\.partner-application\s*\{[^}]*linear-gradient\(135deg, #503073 0%, #3e2063 50%, #503073 100%\)/);
  assert.match(css, /\.partner-application__content\s*\{[^}]*width: 880px/);
  assert.match(css, /\.partner-application__wave\s*\{[^}]*display: none/);
  assert.match(css, /\.partner-application__fields button:hover\s*\{[^}]*background: #68186a/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.partner-application__fields\s*\{[^}]*flex-direction: column/);
  assert.match(css, /input:checked\s*\{[^}]*data:image\/svg\+xml/);
  assert.match(html, /class="partner-application__error"[^>]*>Укажите Telegram или email для связи/);
  assert.match(css, /\.partner-application__field\.has-error input\s*\{[^}]*border: 1\.5px solid #e6484b/);
  assert.match(css, /\.partner-application__error\s*\{[^}]*color: #ff8a8d/);
  assert.match(html, /class="partner-application__spinner"/);
  assert.match(html, /class="partner-application__success"/);
  assert.match(html, /Заявка отправлена/);
  assert.match(html, /Менеджер напишет вам в течение рабочего дня/);
  assert.match(script, /partnerForm\.addEventListener\('submit'/);
  assert.match(script, /partnerForm\.classList\.add\('is-loading'\)/);
  assert.match(script, /partnerForm\.classList\.add\('is-success'\)/);
});
