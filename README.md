# chatgpt-lite README

A VS Code Extension to utilize ChatGPT in a side panel. No more switching between tabs, no data mining or collection, no BS, just ChatGPT like you'd expect.

## Features

Use ChatGPT with your OpenAI API Key, displaying results and conversations in a sidebar webview.

## Requirements

This is a VSCode extension, so of course this requires a working version of VSCode.  This project renders a React app created and built with Vite inside a VSCode sidepanel.  NPM is the package manager being used for both the extension itself and the React app.  In a future version, package management will probably be switched to Yarn or pnpm.

For now, api keys and creativity (Temperature of the language model) values are stored in localstorage, this will most likely change in the future.

## Creating a Development Environment

- Clone this repo
- In the root directory run `npm i`, then in the src/app/cgptlite-app directory run `npm i`
- In the root directory run `npm run watch`, this will build the React app, compile the extension using WebPack, and let you start developing
- At this point, you can press `f5` or whatever your "Run/Launch" shortcut is, if done right you should see a debug environment open up with the extension loaded
- After making changes, you'll need to reload the development environment window. On Windows, this is as simple as CTRL + R in that window, but there are lots of ways to refresh that I won't cover here
- Set your API key and creativity level in the "Configure" panel

## Extension Settings

TBD

## Known Issues

TBD

## Release Notes

### 1.0.0

TBA

