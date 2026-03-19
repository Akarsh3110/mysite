export default function renderCards(grid, items, category) {
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = category === 'All'
    ? items
    : items.filter((item) => item.category === category);

  if (!filtered.length) {
    grid.innerHTML = '<p class="no-results">No adventures found.</p>';
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'adventure-card';

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title || ''}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;

    grid.appendChild(card);
  });
}
