# Campus360

Campus360 is a front-end student portal built with plain HTML, CSS, and JavaScript. It gives you a dashboard for academics, attendance, results, placements, notices, and a small AI assistant for demo use.

This project is meant to look and feel like a real campus portal, but all the data is sample-only. Nothing is connected to a real database or student system.

## How to run it
1. Open the project folder in VS Code.
2. If you want the smoothest experience, install the Live Server extension.
3. Right-click on `index.html` and choose “Open with Live Server”.
4. You can also open `index.html` directly in a browser if you prefer.

Once it loads, the campus dashboard will appear and you can explore the pages. The AI assistant is available from the floating button.

## Using the AI feature
If you just want demo responses, you can click the AI button without adding a key. The assistant will answer using the built-in sample campus data.

If you want real Gemini responses, do this:
1. Go to [Google AI Studio API keys](https://aistudio.google.com/apikey).
2. Sign in and create a Gemini API key.
3. In the app, click the settings button or the “Set up” option.
4. Paste your key and click “Connect AI”.
5. The default model is `gemini-3.8-flash`, but you can change it if Google AI Studio shows another model available.

## Important notes
- The app calls Gemini directly from the browser.
- Your key stays in the browser memory only while the page is open.
- It is not saved to a database or file.
- Do not use your personal API key on a public site or shared project.
- For a real production app, the API request should go through a backend so the key stays protected.

## Limits and safety
- The free Gemini tier has rate limits and quota limits.
- If you get a 429 error, check your usage in Google AI Studio.
- A 403 error usually means the API key or project does not have access.
- A 404 error usually means the selected model is not available.
- If the request seems blocked, use Live Server and check the browser console for details.

## Data storage
This app does not store real student data. The values in `script.js` are hard-coded sample records.

The task list, chat history, and API key are kept in memory only and reset when the page reloads. Nothing is connected to a university system.

## Features included
- Responsive dashboard and sidebar navigation
- Academics, attendance, results, and timetable sections
- Placement tracker and skill overview
- Campus events and notices
- Task checklist that lasts only for the current session
- Search and notification-like UI elements
- Export summary action
- Built-in sample AI support and optional live Gemini integration

## Editing the sample data
If you want to change the demo content, edit the `D` object near the top of `script.js`. That is where the student, subjects, timetable, notices, and placements data live.

## Project files
- `index.html` — page structure
- `style.css` — styling and layout
- `script.js` — sample data and app logic
- `README.md` — setup notes and project details