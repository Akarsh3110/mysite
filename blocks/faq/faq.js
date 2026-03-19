export default function decorate(block) {
  const rows = [...block.children];

  // MAIN LAYOUT
  const layout = document.createElement('div');
  layout.className = 'faq-layout';

  const left = document.createElement('div');
  left.className = 'faq-left';

  const right = document.createElement('div');
  right.className = 'faq-help';

  // =========================
  // ✅ TOP SECTION (IMAGE + TEXT)
  // =========================

  const firstRow = rows[0];
  if (firstRow) {
    firstRow.classList.add('faq-intro');
    left.appendChild(firstRow);
  }

  // =========================
  // ✅ FAQ ITEMS
  // =========================

  rows.slice(1).forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const questionText = cols[0].textContent.trim();
    const answerText = cols[1].textContent.trim();

    const item = document.createElement('div');
    item.className = 'faq-item';

    const question = document.createElement('div');
    question.className = 'faq-question';
    question.innerHTML = `
      <span>${questionText}</span>
      <span class="faq-toggle">+</span>
    `;

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.textContent = answerText;

    question.addEventListener('click', () => {
      item.classList.toggle('open');
      question.querySelector('.faq-toggle').textContent = item.classList.contains('open') ? '-' : '+';
    });

    item.append(question, answer);
    left.appendChild(item);
  });

  // =========================
  // ✅ RIGHT SIDE HELP
  // =========================

  right.innerHTML = `
    <h3>Need more help?</h3>
    <p>Give us a call at <a href="#">1-800-800-0000</a>.</p>
    <p>E-mail us at <a href="#">info@wknd.com</a></p>
    <p>We love to talk adventures!</p>
  `;

  // FINAL APPEND
  layout.append(left, right);

  block.innerHTML = '';
  block.append(layout);
}
