# Midori Playground

Interactive WebAssembly-based playground for the Midori programming language.

## Structure

```
src/app/playground/
├── page.tsx              # Route wrapper
├── MidoriPlayground.tsx  # Main playground component
└── README.md            # This file
```

## Features

- **Auto-loading Runtime**: WASM module loads automatically on page mount
- **VS Code-style Editor**: Professional dark theme with line numbers
- **Synchronized Scrolling**: Line numbers stay in sync with editor
- **Keyboard Shortcuts**: Ctrl+Enter to run code, Tab for indentation
- **Example Programs**: Factorial, Fibonacci, pattern matching, closures
- **Status Bar**: Shows runtime state and line count

## How It Works

1. Component mounts and automatically calls `loadMidoriModule()`
2. Loads `midori.js` and `midori.wasm` from `/public`
3. Sets up Emscripten virtual filesystem with MidoriPrelude modules
4. User writes/edits Midori code
5. User presses Ctrl+Enter or clicks "Run Code"
6. Code is executed via WASM module's `executeMidoriCode()` function
7. Output/errors displayed in output panel

## Prerequisites

Required files in `/public`:
- `midori.js` - Emscripten glue code
- `midori.wasm` - WebAssembly binary
- `MidoriPrelude/*.mdr` - Standard library modules

## Building WASM

From the Midori repository:

```bash
python scripts/build_wasm.py
python scripts/deploy_wasm.py
```

See Midori's `WASM_BUILD_INSTRUCTIONS.md` for details.

## Color Scheme

Matches VS Code's dark theme:
- Background: `#1e1e1e`
- Editor text: `#d4d4d4`
- Line numbers: `#858585`
- Toolbar: `#2d2d30`
- Buttons: `#0e639c` (blue), `#16825d` (green)

## Future Enhancements

- Monaco Editor integration for better syntax highlighting
- Shareable URLs with encoded code
- Local storage persistence
- Execution timeout protection
- Multi-file support
