export default function decorate(block) {
  const textContainer = block.querySelector(':scope > div > div:last-child');

  if (!textContainer) return;

  const paragraphs = textContainer.querySelectorAll('p');

  if (paragraphs.length < 2) return;

  const buttonTextPara = paragraphs[1];

  // Create button
  const button = document.createElement('a');
  button.textContent = buttonTextPara.textContent;
  button.href = '/trips'; //  change to your correct link
  button.className = 'new-adventure-btn';

  // Replace paragraph with button
  buttonTextPara.replaceWith(button);
}
