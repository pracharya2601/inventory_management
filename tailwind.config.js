module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  // i18n: {
  //   locales: ["en-US"],
  //   defaultLocale: "en-US",
  // },
  purge: {
    content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
    // These options are passed through directly to PurgeCSS
  },
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        checkDark: "url('/icons/check_dark.svg')",
        // landscape: "url('/images/landscape/2.jpg')",
      }),
      ringOffsetWidth: {
        '3': '3px',
        '6': '6px',
        '7': "7px",
        '8': '8px',
        '9': '9px',
        '10': '10px',
      },
      ringWidth: {
        '3': '3px',
        '6': '6px',
        '7': "7px",
        '8': '8px',
        '9': '9px',
        '10': '10px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
      ringOffsetWidth: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};
