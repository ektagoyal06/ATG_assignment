ATS_Assignment: Chrome Extension
It is a **frontend-only Chrome Extension** built using **React + Vite**.  
It allows users to **instantly fetch the title and URL of the active browser tab** and **copy** them to clipboard.  
No backend, no server — everything runs directly in your browser!


## ✨ Features

- 🚀 Fetches **active tab’s title and URL**
- 📋 **Copy to clipboard** button for quick sharing
- 💻 Built entirely in **React (Vite)**
- 🧩 Uses **Chrome Extension Manifest V3**
- ⚡ Lightweight and responsive popup UI


## 🧠 How It Works
When you click **“Get Tab Info”**, the extension uses the Chrome Tabs API to fetch details of your active tab and displays them in the popup.

## Working flow
-open the chrome://extensions/ in the new tab 

-enables the developer mode

-then load unpacked and select the /dist folder from the project

-then the extension is successfully added on the chrome extension list

-pin the extension on the taskbar represented by an image

-when click on the image then it has a button of "Get tab info", click on that then it will give the name and url of the current tab open.
