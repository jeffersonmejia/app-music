import "./About.css";
import cover011 from "../../assets/cover/011-mora.png";
import cover016 from "../../assets/cover/016-ed.png";
import cover017 from "../../assets/cover/017-ed.png";
import cover018 from "../../assets/cover/018-ed.png";
import { SkeletonImage } from "../../components/SkeletonImage/SkeletonImage";
import { Headphones, Library, ListMusic, Radio, Sparkles, Waves } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Millones de canciones",
    text: "Escucha lanzamientos, clásicos, álbumes completos y playlists para cada momento.",
  },
  {
    icon: Headphones,
    title: "Tu música contigo",
    text: "Reproduce tus favoritos, descubre artistas y sigue escuchando mientras exploras.",
  },
  {
    icon: Waves,
    title: "Sonido para cada plan",
    text: "Encuentra música para estudiar, entrenar, viajar o simplemente quedarte en el mood.",
  },
];

const highlights = [
  { icon: ListMusic, text: "Playlists para cada mood" },
  { icon: Sparkles, text: "Álbumes completos y lanzamientos" },
  { icon: Radio, text: "Escucha continua mientras navegas" },
];

const aboutCovers = [cover016, cover017, cover018, cover011];

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
            {highlights.map((highlight) => (
              <span key={highlight.text}>
                <highlight.icon size={18} strokeWidth={2.1} />
                {highlight.text}
              </span>
            ))}
          </div>
        </article>

        <div className="about-covers" aria-label="Album covers">
          {aboutCovers.map((cover, index) => (
            <SkeletonImage className={index === 0 ? "about-cover about-cover--large" : "about-cover"} src={cover} alt="Album cover" key={cover} />
          ))}
        </div>
      </div>

      <div className="about-grid">
        {features.map((feature) => (
          <article className="about-card" key={feature.title}>
            <feature.icon className="about-card__icon" size={24} strokeWidth={2.1} />
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
