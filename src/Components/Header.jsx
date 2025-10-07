export default function Header({ name, message }) {
  const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <header id="home">
      <h1>{name}</h1>
      <p>{message}</p>
      <em>{randomQuote}</em>
    </header>
  );
}
