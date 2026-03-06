// export default function decorate(block) {

//   const faqs = [
//     {
//       question: "WHO IS WKND'S INTENDED AUDIENCE?",
//       answer: "WKND is for adventure seekers, travelers, and outdoor enthusiasts."
//     },
//     {
//       question: "HOW DOES WKND PAY FOR ITSELF?",
//       answer: "WKND earns revenue through sponsorships, partnerships, and content promotion."
//     },
//     {
//       question: "CAN I CONTRIBUTE TO WKND?",
//       answer: "Yes, contributors can submit stories, photography, and travel experiences."
//     },
//     {
//       question: "HOW OFTEN IS WKND UPDATED?",
//       answer: "New content is added regularly to keep readers inspired."
//     },
//     {
//       question: "WHEN WAS WKND FOUNDED?",
//       answer: "WKND was created as a demonstration site for Adobe Experience Manager."
//     },
//     {
//       question: "IS A HOT DOG A SANDWICH?",
//       answer: "That's a debate we leave to the community."
//     },
//     {
//       question: "IS WKND A REAL COMPANY?",
//       answer: "No. WKND is a fictional brand created by Adobe."
//     }
//   ];

//   const faqContainer = document.createElement('div');

//   faqs.forEach((faq) => {

//     const item = document.createElement('div');
//     item.className = 'faq-item';

//     const question = document.createElement('div');
//     question.className = 'faq-question';
//     question.innerHTML = `
//       <span>${faq.question}</span>
//       <span class="faq-toggle">+</span>
//     `;

//     const toggle = question.querySelector('.faq-toggle');

//     const answer = document.createElement('div');
//     answer.className = 'faq-answer';
//     answer.textContent = faq.answer;

//     item.append(question, answer);

//     question.addEventListener('click', () => {
//       item.classList.toggle('open');
//         if (item.classList.contains('open')) {
//         toggle.textContent = '-';
//         } else {
//         toggle.textContent = '+';
//         }
//     });

//     faqContainer.append(item);

//   });

//   block.append(faqContainer);
// }

export default function decorate(block) {
  const faqs = [
    {
      question: "WHO IS WKND'S INTENDED AUDIENCE?",
      answer: 'WKND is for adventure seekers, travelers, and outdoor enthusiasts.',
    },
    {
      question: 'HOW DOES WKND PAY FOR ITSELF?',
      answer: 'WKND earns revenue through sponsorships, partnerships, and content promotion.',
    },
    {
      question: 'CAN I CONTRIBUTE TO WKND?',
      answer: 'Yes, contributors can submit stories, photography, and travel experiences.',
    },
    {
      question: 'HOW OFTEN IS WKND UPDATED?',
      answer: 'New content is added regularly to keep readers inspired.',
    },
    {
      question: 'WHEN WAS WKND FOUNDED?',
      answer: 'WKND was created as a demonstration site for Adobe Experience Manager.',
    },
    {
      question: 'IS A HOT DOG A SANDWICH?',
      answer: "That's a debate we leave to the community.",
    },
    {
      question: 'IS WKND A REAL COMPANY?',
      answer: 'No. WKND is a fictional brand created by Adobe.',
    },
  ];

  /* MAIN LAYOUT WRAPPER */
  const layout = document.createElement('div');
  layout.className = 'faq-layout';

  /* LEFT SIDE (FAQ LIST) */
  const faqContainer = document.createElement('div');
  faqContainer.className = 'faq-list';

  faqs.forEach((faq) => {
    const item = document.createElement('div');
    item.className = 'faq-item';

    const question = document.createElement('div');
    question.className = 'faq-question';
    question.innerHTML = `
      <span>${faq.question}</span>
      <span class="faq-toggle">+</span>
    `;

    const toggle = question.querySelector('.faq-toggle');

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.textContent = faq.answer;

    item.append(question, answer);

    question.addEventListener('click', () => {
      item.classList.toggle('open');

      toggle.textContent = item.classList.contains('open') ? '-' : '+';
    });

    faqContainer.append(item);
  });

  /* RIGHT SIDE (HELP SECTION) */

  const help = document.createElement('div');
  help.className = 'faq-help';

  help.innerHTML = `
    <h3>Need more help?</h3>
    <p>Give us a call at <a href="#">1-800-800-0000</a>.</p>
    <p>E-mail us at <a href="#">info@wknd.com</a></p>
    <p>We love to talk adventures!</p>
  `;

  /* APPEND TO LAYOUT */

  layout.append(faqContainer, help);

  block.append(layout);
}
