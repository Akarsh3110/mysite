/* eslint-disable no-use-before-define */
export default async function decorate(block) {
  //  DEBUG: log what the block actually contains
  // console.log('=== CAROUSEL BLOCK HTML ===');
  // console.log(block.innerHTML);
  // console.log('Number of direct children (rows):', block.children.length);
  [...block.children].forEach((row, i) => {
    console.log(`Row ${i}:`, row.outerHTML.substring(0, 200));
  });

  //  Collect ALL pictures anywhere in the block
  // This handles any authoring structure — single cell, multi-cell, nested divs
  const allPictures = [...block.querySelectorAll('picture')];
  // console.log('Total pictures found:', allPictures.length);

  // Also collect any text data from rows (for title/desc/button)
  const rows = [...block.children];

  block.innerHTML = '';

  //  Wrapper
  const sliderWrapper = document.createElement('div');
  sliderWrapper.classList.add('carousel-slider');

  if (allPictures.length === 0) {
    console.warn('No pictures found in carousel block!');
    block.append(sliderWrapper);
    return;
  }

  //  Build one slide per picture found
  allPictures.forEach((picture, i) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    if (i === 0) slide.classList.add('active');

    // Image section
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('carousel-image');
    imageDiv.append(picture);
    slide.append(imageDiv);

    // Content section — from matching row
    const row = rows[i];
    if (row) {
      const cells = [...row.children];
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('carousel-content');

      // Title — cell[1] or any heading in the row
      const titleCell = cells[1];
      const titleText = titleCell
        ? titleCell.textContent.trim()
        : row.querySelector('h1,h2,h3,strong')?.textContent.trim();

      if (titleText) {
        const h2 = document.createElement('h2');
        h2.textContent = titleText;
        contentDiv.append(h2);
      }

      // Description — cell[2]
      const descText = cells[2] ? cells[2].textContent.trim() : '';
      if (descText) {
        const p = document.createElement('p');
        p.textContent = descText;
        contentDiv.append(p);
      }

      // Button — cell[3] or any <a> tag in row
      const anchor = cells[3]?.querySelector('a') || row.querySelector('a');
      if (anchor) {
        const btn = document.createElement('a');
        btn.classList.add('carousel-btn');
        btn.href = anchor.href || '#';
        btn.textContent = anchor.textContent.trim() || 'VIEW TRIP';
        contentDiv.append(btn);
      }

      if (contentDiv.children.length > 0) {
        slide.append(contentDiv);
      }
    }

    sliderWrapper.append(slide);
  });

  block.append(sliderWrapper);

  const slides = block.querySelectorAll('.carousel-slide');
  console.log('Slides built:', slides.length);

  if (slides.length === 0) return;

  let currentIndex = 0;
  let interval;

  //  Dot indicators
  const dotsWrapper = document.createElement('div');
  dotsWrapper.classList.add('carousel-dots');

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(i);
      startAutoSlide();
    });
    dotsWrapper.append(dot);
  });

  //  Arrow nav
  const navDiv = document.createElement('div');
  navDiv.classList.add('carousel-nav');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-prev');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M15 18l-6-6 6-6" fill="none" stroke="black" stroke-width="2"/>
</svg>
`;

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-next');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M9 6l6 6-6 6" fill="none" stroke="black" stroke-width="2"/>
</svg>
  `;

  navDiv.append(prevBtn, nextBtn);

  // Bottom bar
  const bottomBar = document.createElement('div');
  bottomBar.classList.add('carousel-bottom');
  bottomBar.append(dotsWrapper);
  bottomBar.append(navDiv);
  block.append(bottomBar);

  //  Slide logic
  function updateDots() {
    dotsWrapper.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function showSlide(index) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    updateDots();
    console.log('Showing slide:', currentIndex);
  }

  function nextSlide() { showSlide(currentIndex + 1); }
  function prevSlide() { showSlide(currentIndex - 1); }
  function startAutoSlide() { interval = setInterval(nextSlide, 5000); }
  function stopAutoSlide() { clearInterval(interval); }

  nextBtn.addEventListener('click', () => {
    console.log('Next clicked');
    stopAutoSlide(); nextSlide(); startAutoSlide();
  });
  prevBtn.addEventListener('click', () => {
    console.log('Prev clicked');
    stopAutoSlide(); prevSlide(); startAutoSlide();
  });

  block.addEventListener('mouseenter', stopAutoSlide);
  block.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}
