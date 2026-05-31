import "./Contact.css";
import cover002 from "../../assets/cover/002-feid.png";
import cover004 from "../../assets/cover/004-feid.png";
import cover007 from "../../assets/cover/007-feid.png";

const contactOptions = [
  {
    title: "Planes",
    text: "Consulta opciones individuales, familiares o para estudiantes.",
    value: "support@music.app",
  },
  {
    title: "Artistas",
    text: "Información para compartir música, lanzamientos y perfiles de artista.",
    value: "curators@music.app",
  },
  {
    title: "Ayuda",
    text: "Soporte para cuenta, reproducción, biblioteca y acceso al servicio.",
    value: "feedback@music.app",
  },
];

export const ContactPage = () => {
  return (
    <section className="contact-page">
      <div className="contact-hero">
        <article className="contact-hero__copy">
          <h1>Soporte para que la música nunca se detenga.</h1>
          <p>Planes, artistas, biblioteca y ayuda para seguir escuchando en todos tus dispositivos.</p>
        </article>

        <div className="contact-hero__covers" aria-label="Album covers">
          <img className="contact-cover contact-cover--large" src={cover002} alt="Album cover" />
          <img className="contact-cover" src={cover004} alt="Album cover" />
          <img className="contact-cover" src={cover007} alt="Album cover" />
        </div>
      </div>

      <div className="contact-grid">
        <article className="contact-card contact-card--featured">
          <h2>Escucha, descubre y comparte.</h2>
          <p>
            Encuentra ayuda para planes, biblioteca, reproducción y formas de
            disfrutar tu música en todos tus dispositivos.
          </p>
        </article>

        {contactOptions.map((option) => (
          <article className="contact-card" key={option.title}>
            <h2>{option.title}</h2>
            <p>{option.text}</p>
            <a href={`mailto:${option.value}`}>{option.value}</a>
          </article>
        ))}
      </div>
    </section>
  );
};
