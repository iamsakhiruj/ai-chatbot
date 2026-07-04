const header = document.querySelector('header');
const messageArea = document.getElementById('message-area');

function getAppName() {
  return localStorage.getItem('appName') || 'Nova';
}

function saveAppName(name) {
  localStorage.setItem('appName', name);
}

function setTitle(name) {
  document.title = name;
}

function updateWelcome(name) {
  const el = document.getElementById('welcome-message');
  if (el) el.textContent = `Welcome to ${name}! Send a message to get started.`;
}

// Delegate clicks on header — works even after h1 is swapped out
header.addEventListener('click', (e) => {
  const h1 = e.target.closest('h1#app-name');
  if (!h1 || header.querySelector('#name-edit-input')) return; // already editing

  const current = h1.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'name-edit-input';
  input.value = current;
  input.setAttribute('aria-label', 'Rename app');
  h1.replaceWith(input);
  input.focus();
  input.select();

  function commit() {
    const newName = input.value.trim() || 'Nova';
    const newH1 = document.createElement('h1');
    newH1.id = 'app-name';
    newH1.title = 'Click to rename';
    newH1.textContent = newName;
    input.replaceWith(newH1);

    saveAppName(newName);
    setTitle(newName);
    updateWelcome(newName);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { input.value = current; commit(); }
  });

  // blur fires when user clicks away — treat it as a save
  input.addEventListener('blur', commit);
});

// On load: apply saved name and show welcome message
const name = getAppName();
document.getElementById('app-name').textContent = name;
setTitle(name);

const welcome = document.createElement('p');
welcome.id = 'welcome-message';
welcome.textContent = `Welcome to ${name}! Send a message to get started.`;
messageArea.appendChild(welcome);
