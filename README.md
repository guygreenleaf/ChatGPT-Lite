# chatgpt-lite README

A VS Code Extension to utilize ChatGPT in a side panel. No more switching between tabs, no data mining or collection, no BS, just ChatGPT like you'd expect.

## Features

Use ChatGPT with your OpenAI API Key, displaying results and conversations in a sidebar webview.

## Requirements

This is a VSCode extension, so of course this requires a working version of VSCode.  This project renders a React app created and built with Vite inside a VSCode sidepanel.  NPM is the package manager being used for both the extension itself and the React app.  In a future version, package management will probably be switched to Yarn or pnpm.


Additionally, you will need a .env file, placed in src/app/cgptlite-app and to define a VITE_OPENAI_API_KEY in that .env file, using your OpenAI API Key.


## Creating a Development Environment

- Clone this repo
- Create a .env file, define a VITE_OPENAI_API_KEY in that .env file using your OpenAI API Key, and place it in src/app/cgptlite-app 
- In the root directory run `npm i`, then in the src/app/cgptlite-app directory run `npm i`
- In the root directory run `npm run watch`, this will build the React app, compile the extension using WebPack, and let you start developing
- At this point, you can press `f5` or whatever your "Run/Launch" shortcut is, if done right you should see a debug environment open up with the extension loaded
- After making changes, you'll need to reload the development environment window. On Windows, this is as simple as CTRL + R in that window, but there are lots of ways to refresh that I won't cover here


## Extension Settings

TBD

## Known Issues

TBD

## Release Notes

### 1.0.0

TBA

