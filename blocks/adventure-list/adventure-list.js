export default async function decorate(block) {

  const response = await fetch('/data.json');
// const response = await fetch('https://main--mysite--akarsh3110.aem.page/data.json');

  const data = await response.json();

  const items = data.data || data;
  // console.log(items,"ok")

  //  HEADING 
  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'adventure-heading';

  const heading = document.createElement('h2');
  heading.textContent = 'Current Adventure';

  headingWrapper.appendChild(heading);
  block.appendChild(headingWrapper);
  // 


  // filters container
  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'adventure-filters';

  const categories = ['All', ...new Set(items.map(item => item.category))];

  categories.forEach(cat => {
    const filter = document.createElement('div');
    filter.textContent = cat.toUpperCase();
    filter.className = 'adventure-filter';
    if (cat === 'All') filter.classList.add('active');

    filter.addEventListener('click', () => {
      document.querySelectorAll('.adventure-filter')
        .forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      renderCards(cat);
    });

    filtersContainer.appendChild(filter);
  });

  block.appendChild(filtersContainer);

  // grid container
  const grid = document.createElement('div');
  grid.className = 'adventure-grid';
  block.appendChild(grid);

  function renderCards(category) {
    grid.innerHTML = '';

    const filtered = category === 'All'
      ? items
      : items.filter(item => item.category === category);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'adventure-card';

      card.innerHTML = `
        <img src="${item.image}" alt="">
        <h3>${item.head}</h3>
        <p>${item.des}</p>
      `;

      grid.appendChild(card);
    });
  }

  renderCards('All');
}