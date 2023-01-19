// Change Theme

const themes = document.querySelectorAll('.themes__input');

const storeTheme = function (theme) {
  localStorage.setItem('theme', theme);
};

const setTheme = function (theme) {
  document.documentElement.className = theme;

  themes.forEach((optionTheme) => {
    if (optionTheme.id === theme) optionTheme.checked = true;
  });
};

const loadTheme = function () {
  const savedTheme = localStorage.getItem('theme');
  console.log(savedTheme);

  if (!savedTheme) {
    const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    setTheme(preferTheme);
  } else {
    setTheme(savedTheme);
  }
};

themes.forEach((theme) =>
  theme.addEventListener('click', function () {
    storeTheme(this.id);
    setTheme(this.id);
  })
);

window.addEventListener('load', loadTheme);
