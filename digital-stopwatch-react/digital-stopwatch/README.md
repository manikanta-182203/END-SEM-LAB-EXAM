# Digital Stopwatch (React)

A responsive digital stopwatch built with React hooks.

## Features
- Start and resume the stopwatch
- Pause while preserving elapsed time
- Stop and reset the timer to `00:00:00.00`
- Reset button
- Displays hours, minutes, seconds, and centiseconds
- Responsive dark UI

## React concepts used
- `useState` stores elapsed milliseconds and running/paused state.
- `useEffect` starts and cleans up the interval.
- `useStopwatch` is a custom hook that keeps timer logic reusable.

## Run locally

1. Install Node.js (LTS).
2. Extract this ZIP and open the `digital-stopwatch` folder in VS Code.
3. Open the terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Controls
- **Start / Resume:** starts or resumes counting.
- **Pause:** pauses without clearing the elapsed time.
- **Stop:** stops and resets to zero.
- **Reset:** also returns the timer to zero.
