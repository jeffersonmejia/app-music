import "./About.css";
import cover001 from "../../assets/cover/001-feid.png";
import cover003 from "../../assets/cover/003-feid.png";
import cover006 from "../../assets/cover/006-feid.png";
import cover008 from "../../assets/cover/008-feid.png";

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

const aboutCovers = [cover001, cover003, cover006, cover008];

export const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <article className="about-hero__copy">
          <h1>Toda la música que amas, lista para sonar.</h1>
          <p>
            Explora álbumes, artistas y canciones con una experiencia pensada
            para escuchar sin interrupciones.
          </p>
          <div className="about-highlights">
            <span>Playlists para cada mood</span>
            <span>Álbumes completos y lanzamientos</span>
            <span>Escucha continua mientras navegas</span>
          </div>
        </article>

        <div className="about-covers" aria-label="Album covers">
          {aboutCovers.map((cover, index) => (
            <img className={index === 0 ? "about-cover about-cover--large" : "about-cover"} src={cover} alt="Album cover" key={cover} />
          ))}
        </div>
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
