// Private section - simple password protection
// Password is hashed with SHA-256 so it's not stored in plaintext
// NOTE: This is client-side only. Not truly secure, but enough for personal use.

const HASHED_PASSWORD = '40a21c69f287bf765930b16e0f4c7a0cd23b3f496c4e1772effe32459032e85c';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function unlock() {
  const input = document.getElementById('private-password');
  const errorMsg = document.getElementById('error-msg');
  const password = input.value;

  if (!password) return;

  const hashed = await hashPassword(password);

  // If no password is set yet, check against the stored hash
  if (hashed === HASHED_PASSWORD) {
    document.querySelector('.private-gate').style.display = 'none';
    document.querySelector('.private-content').classList.add('unlocked');
    sessionStorage.setItem('private_unlocked', 'true');
    errorMsg.style.display = 'none';
  } else {
    errorMsg.style.display = 'block';
    input.value = '';
    input.focus();
  }
}

// Check if already unlocked in this session
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('private_unlocked') === 'true') {
    document.querySelector('.private-gate').style.display = 'none';
    document.querySelector('.private-content').classList.add('unlocked');
  }

  // Enter key support
  const input = document.getElementById('private-password');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') unlock();
    });
  }
});
