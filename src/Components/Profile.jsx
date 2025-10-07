export default function Profile({ photo, title, bio }) {
  return (
    <section>
      <img src={photo} alt="profile" style={{ borderRadius: "50%" }} />
      <h2>{title}</h2>
      <p>{bio}</p>
    </section>
  );
}
