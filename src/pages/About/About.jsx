import "./About.css";

const features = [
  {
    title: "Millones de canciones",
    text: "Escucha lanzamientos, clásicos, álbumes completos y playlists para cada momento.",
  },
  {
    title: "Tu música contigo",
    text: "Reproduce tus favoritos, descubre artistas y sigue escuchando mientras exploras.",
  },
  {
    title: "Sonido para cada plan",
    text: "Encuentra música para estudiar, entrenar, viajar o simplemente quedarte en el mood.",
  },
];

export const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <h1>Toda la música que amas, lista para sonar.</h1>
        <p>
          Explora álbumes, artistas y canciones con una experiencia pensada para
          escuchar sin interrupciones.
        </p>
      </div>

      <div className="about-grid">
        {features.map((feature) => (
          <article className="about-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
