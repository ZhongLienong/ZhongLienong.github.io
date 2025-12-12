"use client";

export default function VisitorCounter() {
  return (
    <div className="hit-counter">
      <div className="counter-display" aria-live="polite">
        <div className="counter-label">Visitors</div>
        <div className="counter-embed">
          <img
            src="https://counter1.optistats.ovh/private/freecounterstat.php?c=wdcju8fzl33len46bhzd9u79z8mekcm4"
            alt="visitor counter"
            style={{ display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
