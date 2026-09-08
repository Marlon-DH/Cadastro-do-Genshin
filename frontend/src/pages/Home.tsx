import { useEffect, useState } from "react";
import Agenda from "../components/Agenda";
import LeftBar from "../components/LeftBar";
import { getPlanningOptions } from "../services/game-data";
import type { FarmItem } from "../types/farm";
import type { DatabaseCharacter, DatabaseWeapon } from "../types/game";


type SavedPlan = { character: string; weapon: string };

function Home() {
  const [characters, setCharacters] = useState<DatabaseCharacter[]>([]);
  const [weapons, setWeapons] = useState<DatabaseWeapon[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState("");
  const [selectedWeaponId, setSelectedWeaponId] = useState("");
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadPlanningOptions() {
      try {
        const options = await getPlanningOptions();
        setCharacters(options.characters);
        setWeapons(options.weapons);
        setSelectedCharacterId(String(options.characters[0]?.id ?? ""));
        setSelectedWeaponId(String(options.weapons[0]?.id ?? ""));
      } catch {
        setError(
          "Não foi possível carregar personagens e armas do banco de dados.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadPlanningOptions();
  }, []);

  const activeCharacter = characters.find(
    (character) => character.id === Number(selectedCharacterId),
  );
  const activeWeapon = weapons.find(
    (weapon) => weapon.id === Number(selectedWeaponId),
  );
  const activeItems: FarmItem[] = [];

  function addToAgenda() {
    if (!activeCharacter || !activeWeapon) return;
    const exists = savedPlans.some(
      (plan) =>
        plan.character === activeCharacter.name &&
        plan.weapon === activeWeapon.name,
    );
    if (!exists)
      setSavedPlans((plans) => [
        ...plans,
        { character: activeCharacter.name, weapon: activeWeapon.name },
      ]);
    setNotice(
      exists
        ? "Esta combinação já está na sua agenda."
        : "Planejamento salvo. Agora vamos conectar os materiais.",
    );
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <div className="app-shell">
      <LeftBar />
      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PLANEJAMENTO DE FARM</p>
            <h1>Minha agenda</h1>
          </div>
          <button className="profile">D</button>
        </header>
        <section className="intro">
          <div>
            <h2>
              Bom dia, Viajante! <span>✦</span>
            </h2>
            <p>Organize sua resina e não perca mais nenhum dia de domínio.</p>
          </div>
          <div className="resin">
            <span className="resin-orb">◉</span>
            <div>
              <small>RESINA ORIGINAL</small>
              <b>
                160 <em>/ 160</em>
              </b>
            </div>
            <button>+</button>
          </div>
        </section>
        <section className="planner-card">
          <div className="planner-head">
            <div>
              <p className="eyebrow">NOVO PLANEJAMENTO</p>
              <h2>O que você quer farmar?</h2>
            </div>
            <span className="step">1 de 2</span>
          </div>
          {error && <p className="notice">{error}</p>}
          <div className="selectors">
            <label>
              PERSONAGEM
              <select
                value={selectedCharacterId}
                disabled={isLoading}
                onChange={(event) => setSelectedCharacterId(event.target.value)}
              >
                <option value="">
                  {isLoading
                    ? "Carregando personagens..."
                    : "Selecione um personagem"}
                </option>
                {characters.map((character) => (
                  <option key={character.id} value={character.id}>
                    {character.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              ARMA
              <select
                value={selectedWeaponId}
                disabled={isLoading}
                onChange={(event) => setSelectedWeaponId(event.target.value)}
              >
                <option value="">
                  {isLoading ? "Carregando armas..." : "Selecione uma arma"}
                </option>
                {weapons.map((weapon) => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="add-button"
              disabled={!activeCharacter || !activeWeapon}
              onClick={addToAgenda}
            >
              <span>+</span> Adicionar à agenda
            </button>
          </div>
          {notice && <p className="notice">✓ {notice}</p>}
          <div className="selection-preview">
            <div className="char-card">
              <div className="portrait pyro">
                {activeCharacter?.image_url ? (
                  <img
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={activeCharacter.image_url}
                    alt=""
                  />
                ) : (
                  "♟"
                )}
              </div>
              <div>
                <b>{activeCharacter?.name ?? "Nenhum personagem"}</b>
                <small>
                  {activeCharacter
                    ? `${activeCharacter.element} · ${activeCharacter.title}`
                    : "Selecione um personagem"}
                </small>
              </div>
            </div>
            <span className="plus">+</span>
            <div className="char-card">
              <div className="portrait gold">
                {activeWeapon?.image_url ? (
                  <img
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={activeWeapon.image_url}
                    alt=""
                  />
                ) : (
                  "⚔"
                )}
              </div>
              <div>
                <b>{activeWeapon?.name ?? "Nenhuma arma"}</b>
                <small>{activeWeapon?.type ?? "Selecione uma arma"}</small>
              </div>
            </div>
            <div className="auto-tag">✦ Dados carregados do Supabase</div>
          </div>
        </section>
        <Agenda items={activeItems} />
        <section className="saved-section">
          <div>
            <p className="eyebrow">EM ANDAMENTO</p>
            <h2>Seus planejamentos</h2>
          </div>
          <div className="saved-list">
            {savedPlans.length ? (
              savedPlans.map((plan) => (
                <div
                  className="saved-item"
                  key={`${plan.character}-${plan.weapon}`}
                >
                  <span className="saved-spark">✦</span>
                  <div>
                    <b>{plan.character}</b>
                    <small>com {plan.weapon}</small>
                  </div>
                  <span className="status">ATIVO</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#8b8493]">
                Escolha um personagem e uma arma para começar.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
