export default function decorate(block) {

  [...block.children].forEach(card => {

    const title = card.querySelector('strong');

    if (title) {
      card.style.cursor = 'pointer';

      card.addEventListener('click', () => {
        window.location.href = '/trips';
      });
    }

  });

}