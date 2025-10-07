import { useState } from "react";

export default function About() {
  const [showMore, setShowMore] = useState(false);
  return (
    <section id="about">
      <h2>About Me</h2>
      <p>I’m learning React and love building interactive UIs.</p>
      <ul>
        <li>Coffee enthusiast ☕</li>
        <li>Hiking on weekends ⛰️</li>
        <li>Enjoy puzzle games 🧩</li>
      </ul>
      {showMore && <p>I hope to become a full-stack developer soon!</p>}
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </section>
  );
}
