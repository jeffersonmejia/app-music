import "./Services.css";
import albums from "../../data/albums.json";

const albumCovers = import.meta.glob("../../assets/cover/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const getAlbumCover = (coverPath) => {
  return albumCovers[`../../assets/cover/${coverPath}`];
};

export const ServicesPage = () => {
  return (
    <section className="services-page">
      <h1 className="services-hero-title">Tus canciones favoritas en un solo lugar.</h1>
      <h1 className="services-title">Albums</h1>

      <div className="albums-grid">
        {albums.map((album) => (
          <article className="album-card" key={album.id}>
            <img src={getAlbumCover(album.coverPath)} alt={`${album.title} cover`} />
            <h2>{album.title}</h2>
            <p>{album.artist} - {album.year}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
