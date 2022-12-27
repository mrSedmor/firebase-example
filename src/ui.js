export const btnLogout = document.querySelector('#btnLogout');

export const lblAuthState = document.querySelector('#lblAuthState');

export const showLoginForm = () => {
  login.style.display = 'block';
  app.style.display = 'none';
};

export const showApp = () => {
  login.style.display = 'none';
  app.style.display = 'block';
};

export const showLoginState = user => {
  lblAuthState.innerHTML = `You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `;
};
