const includes = (sections) => {
  for (let i = 0; i < sections.length; i++) {
    const startTime = performance.now();

    fetch(`./pages/${sections[i]}.html`)
      .then(response => response.text())
      .then(html => {
        const includeHtml = document.getElementById(sections[i]);
        includeHtml.innerHTML = html;

        const endTime = performance.now();
        const timeElapsed = endTime - startTime;
        //console.log(`Tempo para "${sections[i]}": ${timeElapsed.toFixed(2)} ms`);
      });
  }
}

window.onload = function () {
  includes([
    'header',
    'login',
    'footer',
  ]);

  setTimeout(() => {
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

  }, 810);

}