document.addEventListener('DOMContentLoaded', () => {
  const featureBlock = document.querySelector('.feature.block');

  if (!featureBlock) return;

  featureBlock.style.opacity = '0';
  featureBlock.style.transform = 'translateY(40px)';
  featureBlock.style.transition = 'all 0.6s ease';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        featureBlock.style.opacity = '1';
        featureBlock.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  observer.observe(featureBlock);
});
