export default function decorate(block) {
  // Animation setup
  block.style.opacity = '0';
  block.style.transform = 'translateY(5px)';
  block.style.transition = 'all 0.6s ease';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        block.style.opacity = '1';
        block.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  observer.observe(block);
}
