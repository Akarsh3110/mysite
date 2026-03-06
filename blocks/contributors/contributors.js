export default function decorate(block) {
  const cards = [...block.children];

  cards.forEach((card) => {
    card.classList.add('contributor-card');
  });
}
