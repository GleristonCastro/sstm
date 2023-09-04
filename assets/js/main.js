const signUp = document.getElementById('sign-up');
const signIn = document.getElementById('sign-in');
const loginIn = document.getElementById('login-in');
const loginUp = document.getElementById('login-up');

signUp.addEventListener('click', () => {
  loginIn.classList.remove('block');
  loginUp.classList.remove('none');

  loginIn.classList.toggle('none');
  loginUp.classList.toggle('block');
});

signIn.addEventListener('click', () => {
  loginIn.classList.remove('none');
  loginUp.classList.remove('block');

  loginIn.classList.toggle('block');
  loginUp.classList.toggle('none');
});

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu')

    toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle', 'nav-menu')