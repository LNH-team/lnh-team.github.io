const buildButtons = document.querySelectorAll('.build-btn');

buildButtons.forEach(button => {
  const buttonText = button.querySelector('.btn-text');
  const buttonIcon = button.querySelector('.btn-icon');
  const originalText = buttonText.textContent;
  const originalIcon = buttonIcon.textContent;
  const url = button.dataset.url;

  // Encuentra el contenedor asociado al botón
  const buildContent = button.parentElement.nextElementSibling;

  button.addEventListener('click', () => {
    const isOpen = buildContent.classList.toggle('show');

    if (isOpen) {
      buttonText.textContent = 'Close section';
      buttonIcon.textContent = 'expand_less';
      loadReadme(url, buildContent);
    } else {
      buttonText.textContent = originalText;
      buttonIcon.textContent = originalIcon;
      buildContent.innerHTML = ''; // opcional, limpia contenido al cerrar
    }
  });
});

// load and parse markdown file
async function loadReadme(url, container) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch: ' + url);
    const markdown = await response.text();
    container.innerHTML = marked.parse(markdown);
  } catch (error) {
    container.innerHTML = `<p>Error loading README: ${error.message}</p>`;
  }
}
