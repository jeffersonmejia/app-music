import "./Services.css";
import albums from "../../data/albums.json";
import { SkeletonImage } from "../../components/SkeletonImage/SkeletonImage";
import { Disc3, Library } from "lucide-react";
import { useEffect, useState } from "react";

const albumCovers = import.meta.glob("../../assets/cover/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const getAlbumCover = (coverPath) => {
  return albumCovers[`../../assets/cover/${coverPath}`];
};

const albumList = albums.map((album) => ({
  ...album,
  coverUrl: getAlbumCover(album.coverPath),
}));

const coverUrls = albumList.map((album) => album.coverUrl).filter(Boolean);

export const ServicesPage = () => {
  const [areCoversReady, setAreCoversReady] = useState(coverUrls.length === 0);

  useEffect(() => {
    let isActive = true;

    if (coverUrls.length === 0) {
      return undefined;
    }

    let settledCovers = 0;
    const markCoverAsReady = () => {
      settledCovers += 1;

      if (isActive && settledCovers === coverUrls.length) {
        setAreCoversReady(true);
      }
    };

    coverUrls.forEach((coverUrl) => {
      const cover = new Image();
      cover.onload = markCoverAsReady;
      cover.onerror = markCoverAsReady;
      cover.src = coverUrl;
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="services-page">
      <h1 className="services-hero-title">Toda tu música, aquí.</h1>
      <h1 className="services-title">
        <Library size={24} strokeWidth={2.1} />
        Albums
      </h1>

      <div className="albums-grid">
        {albumList.map((album) => (
          <article className="album-card" key={album.id}>
            {areCoversReady ? (
              <img src={album.coverUrl} alt={`${album.title} cover`} />
            ) : (
              <SkeletonImage src={album.coverUrl} alt={`${album.title} cover`} isPlaceholder />
            )}
            <h2>{album.title}</h2>
            <p>
              <Disc3 size={14} strokeWidth={2.1} />
              {album.artist} - {album.year}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
