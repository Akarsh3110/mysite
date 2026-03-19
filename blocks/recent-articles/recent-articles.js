export default function decorate(block) {
  const cards = [...block.children];

  cards.forEach((card) => {
    const link = card.querySelector('a');

    if (link) {
      card.classList.add('clickable-card');

      card.addEventListener('click', (e) => {
        // prevent double trigger if user clicks actual link
        if (e.target.tagName !== 'A') {
          window.location.href = link.href;
        }
      });
    }
  });

  // Create button wrapper
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'all-articles-wrapper';

  const button = document.createElement('a');
  button.href = '/articles';
  button.textContent = 'ALL ARTICLES';
  button.className = 'all-articles-btn';

  buttonWrapper.append(button);

  block.append(buttonWrapper);
}
