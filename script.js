const appNameEl = document.getElementById('app-name');
const messageArea = document.getElementById('message-area');

function getAppName() {
  return localStorage.getItem('appName') || 'Nova';
}

function saveAppName(name) {
  localStorage.setItem('appName', name);
}

// Click: make the h1 editable and select all its text
appNameEl.addEventListener('click', () => {
  if (appNameEl.contentEditable === 'true') return;
  appNameEl.contentEditable = 'true';
  appNameEl.focus();
  const range = document.createRange();
  range.selectNodeContents(appNameEl);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
});

// Enter: delegate to blur (which handles the save)
// Escape: restore the last saved name and exit edit mode
appNameEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    appNameEl.blur();
  }
  if (e.key === 'Escape') {
    appNameEl.textContent = getAppName();
    appNameEl.contentEditable = 'false';
  }
});

// Blur: save whatever is in the h1 when focus leaves
appNameEl.addEventListener('blur', () => {
  if (appNameEl.contentEditable !== 'true') return;
  const newName = appNameEl.textContent.trim() || 'Nova';
  appNameEl.textContent = newName;
  appNameEl.contentEditable = 'false';
  saveAppName(newName);
  document.title = newName;
  const heading = document.querySelector('#welcome-message .welcome-heading');
  if (heading) heading.textContent = `Hi, I'm ${newName} ✦ How can I help?`;
});

// ── Chat ──

const form = document.getElementById('input-bar');
const input = document.getElementById('message-input');

function addBubble(text, role) {
  const msg = document.createElement('div');
  msg.className = `message message--${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  msg.appendChild(bubble);
  messageArea.appendChild(msg);
  messageArea.scrollTop = messageArea.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  // Hide welcome on first message
  const welcome = document.getElementById('welcome-message');
  if (welcome) welcome.remove();

  addBubble(text, 'user');
  input.value = '';

  setTimeout(() => {
    addBubble("I'm just a demo brain for now — real AI coming soon 🚀", 'ai');
  }, 1000);
});

function buildWelcome(name) {
  const wrapper = document.createElement('div');
  wrapper.id = 'welcome-message';

  const icon = document.createElement('div');
  icon.className = 'welcome-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '✦';

  const heading = document.createElement('p');
  heading.className = 'welcome-heading';
  heading.textContent = `Hi, I'm ${name} ✦ How can I help?`;

  const sub = document.createElement('p');
  sub.className = 'welcome-sub';
  sub.textContent = 'Ask me anything to get started.';

  wrapper.append(icon, heading, sub);
  return wrapper;
}

// Init: apply saved name and show welcome message
const savedName = getAppName();
appNameEl.textContent = savedName;
document.title = savedName;
messageArea.appendChild(buildWelcome(savedName));
