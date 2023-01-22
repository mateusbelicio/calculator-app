class Theme {
  _allThemes = document.querySelectorAll('.themes__input');

  constructor() {
    this._addHandlerTheme();
  }

  /**
   * Change the indicator for the selected theme to show the user which theme is active
   * @param {String} themeSelected  - [dark || light || colorful]
   */
  _changeChecked(themeSelected) {
    this._allThemes.forEach((theme) => {
      if (theme.id === themeSelected) theme.checked = true;
    });
  }

  /**
   * Stores the theme selected in the local storage
   * @param {String} theme - [dark || light || colorful]
   */
  _storeTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  /**
   * Set the new theme selected
   * @param {String} theme - [dark || light || colorful]
   */
  _setTheme(theme) {
    document.documentElement.dataset.theme = theme;
  }

  /**
   * Add event handlers to buttons to change theme
   */
  _addHandlerTheme() {
    const objClass = this;

    this._allThemes.forEach((theme) =>
      theme.addEventListener('click', function () {
        objClass._storeTheme(this.id);
        objClass._setTheme(this.id);
      })
    );
  }

  /**
   * Load theme saved in local storage if it exists or set theme to user default theme
   */
  loadTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (!savedTheme) {
      const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      this._setTheme(preferTheme);
      this._changeChecked(preferTheme);
    } else {
      this._setTheme(savedTheme);
      this._changeChecked(savedTheme);
    }
  }
}

export const theme = new Theme();
