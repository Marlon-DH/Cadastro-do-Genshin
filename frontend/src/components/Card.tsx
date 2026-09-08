import type { DatabaseMaterial } from "../types/game";
import { getCharacterImageUrl } from "../utils/caracterImages";

type EntityCardProps = {
  name: string;
  imageUrl: string | null;
  subtitle: string;
  materials: DatabaseMaterial[];
  entityType?: "character" | "weapon";
};

function EntityCard({
  name,
  imageUrl,
  subtitle,
  materials,
  entityType,
}: EntityCardProps) {
  const imageSource =
    entityType === "character"
      ? getCharacterImageUrl(imageUrl, name)
      : imageUrl ||
        `https://placehold.co/240x240/f1edf8/8b8495?text=${encodeURIComponent(name)}`;

  return (
    <article className="entity-card">
      <div className="entity-image">
        <img
          src={imageSource}
          alt={name}
          onError={(event) => {
            event.currentTarget.src = `https://placehold.co/240x240/f1edf8/8b8495?text=${encodeURIComponent(name)}`;
          }}
        />
      </div>

      <div className="entity-content">
        <h2>{name}</h2>
        <p className="entity-subtitle">{subtitle}</p>

        <h3>Materiais de farm</h3>

        <div className="material-list">
          {materials.length ? (
            materials.map((material) => (
              <div className="material-item" key={material.id}>
                <span>✦</span>
                <div>
                  <b>{material.name}</b>
                  <small>{material.farm_days}</small>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-materials">Nenhum material cadastrado.</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default EntityCard;
