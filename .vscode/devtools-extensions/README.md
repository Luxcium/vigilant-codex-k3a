# DevTools Extensions Directory

This directory is used for custom Microsoft Edge DevTools extensions that can be loaded during debugging sessions.

## Usage

Place Chrome/Edge extension directories here to load them automatically when using the "Launch Edge with DevTools Extensions" configuration.

## Example Structure

```
devtools-extensions/
├── my-custom-extension/
│   ├── manifest.json
│   ├── background.js
│   └── content.js
├── react-devtools/
│   └── ... extension files
└── redux-devtools/
    └── ... extension files
```

## Popular Extensions for Development

1. **React Developer Tools**
2. **Redux DevTools**
3. **Vue.js DevTools**
4. **Lighthouse**
5. **Axe DevTools (Accessibility)**

## Notes

- Extensions must be unpacked (directory format, not .crx files)
- Ensure extensions are compatible with Chromium-based Edge
- Some extensions may require additional configuration
