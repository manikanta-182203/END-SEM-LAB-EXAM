import { useEffect, useState } from "react";
import { Play, Pause, Square, RotateCcw, Timer } from "lucide-react";

// Custom hook keeps stopwatch timing logic separate from the UI.
function useStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const startedAt = Date.now() - elapsed;
    const intervalId = window.setInterval(() => {
      setElapsed(Date.now() - startedAt);
    }, 10);

    return () => window.clearInterval(intervalId);
  }, [isRunning]); // Start/stop the interval only when running state changes.

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const stop = () => {
    setIsRunning(false);
    setElapsed(0);
  };
  const reset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  return { elapsed, isRunning, start, pause, stop, reset };
}

function formatTime(milliseconds) {
  const totalCentiseconds = Math.floor(milliseconds / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    centiseconds: String(centiseconds).padStart(2, "0")
  };
}

export default function App() {
  const { elapsed, isRunning, start, pause, stop, reset } = useStopwatch();
  const time = formatTime(elapsed);

  return (
    <main className="page">
      <section className="stopwatch-card" aria-label="Digital stopwatch">
        <div className="topline">
          <div className="brand">
            <span className="brand-icon"><Timer size={20} /></span>
            <span>CHRONO<span className="brand-accent">.X</span></span>
          </div>
          <span className={`status ${isRunning ? "active" : ""}`}>
            <span className="status-dot" />
            {isRunning ? "RUNNING" : elapsed > 0 ? "PAUSED" : "READY"}
          </span>
        </div>

        <div className="intro">
          <p className="eyebrow">PRECISION TIMEKEEPING</p>
          <h1>Digital Stopwatch</h1>
          <p className="subtitle">Every second counts. Make it yours.</p>
        </div>

        <div className="display" role="timer" aria-live="off">
          <div className="time-group">
            <span className="digits">{time.hours}</span>
            <span className="unit">HRS</span>
          </div>
          <span className="separator">:</span>
          <div className="time-group">
            <span className="digits">{time.minutes}</span>
            <span className="unit">MIN</span>
          </div>
          <span className="separator">:</span>
          <div className="time-group">
            <span className="digits">{time.seconds}</span>
            <span className="unit">SEC</span>
          </div>
          <span className="decimal">.</span>
          <div className="time-group fraction">
            <span className="digits">{time.centiseconds}</span>
            <span className="unit">1/100</span>
          </div>
        </div>

        <div className="progress-track">
          <div className={`progress-bar ${isRunning ? "moving" : ""}`} />
        </div>

        <div className="controls">
          {!isRunning ? (
            <button className="button primary" onClick={start}>
              <Play size={18} fill="currentColor" /> {elapsed > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <button className="button primary pause-button" onClick={pause}>
              <Pause size={18} fill="currentColor" /> Pause
            </button>
          )}
          <button className="button secondary" onClick={stop} disabled={elapsed === 0 && !isRunning}>
            <Square size={16} fill="currentColor" /> Stop
          </button>
          <button className="button reset" onClick={reset} aria-label="Reset stopwatch" title="Reset">
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="bottom-note">
          <span>TRACK YOUR MOMENT</span>
          <span>HH : MM : SS . MS</span>
        </div>
      </section>
      <p className="footer">BUILT WITH REACT <span>•</span> useState &amp; useEffect</p>
    </main>
  );
}