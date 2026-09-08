import { useMemo, useState } from "react";
import Agenda from "../components/Agenda";
import LeftBar from "../components/LeftBar";
import type { Character, FarmItem } from "../types/farm";
const characters: Character[] = [
  {
    name: "Arlecchino",
    element: "Pyro",
    title: "A Serva",
    items: [
      {
        name: "Filosofia da Ordem",
        days: ["Qua", "Sáb", "Dom"],
        kind: "Talento",
        icon: "📚",
      },
      {
        name: "Insígnia do Recruta",
        days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        kind: "Inimigo",
        icon: "✦",
      },
      {
        name: "Vela Desvanecida",
        days: ["Seg"],
        kind: "Chefe semanal",
        icon: "♜",
      },
    ],
  },
  {
    name: "Neuvillette",
    element: "Hydro",
    title: "Iudex de Fontaine",
    items: [
      {
        name: "Filosofia da Equidade",
        days: ["Seg", "Qui", "Dom"],
        kind: "Talento",
        icon: "📚",
      },
      {
        name: "Pérola Transoceânica",
        days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        kind: "Inimigo",
        icon: "✦",
      },
    ],
  },
  {
    name: "Furina",
    element: "Hydro",
    title: "Regina de Fontaine",
    items: [
      {
        name: "Filosofia da Justiça",
        days: ["Ter", "Sex", "Dom"],
        kind: "Talento",
        icon: "📚",
      },
      {
        name: "Néctar da Flor Gigante",
        days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        kind: "Inimigo",
        icon: "✦",
      },
    ],
  },
];
const weapons: Record<string, FarmItem> = {
  "Lança de Jade": {
    name: "Relíquia de Guyun",
    days: ["Seg", "Qui", "Dom"],
    kind: "Arma",
    icon: "⚔",
  },
  "Báculo de Homa": {
    name: "Grão de Areia Negra",
    days: ["Ter", "Sex", "Dom"],
    kind: "Arma",
    icon: "⚔",
  },
  "Tomo do Fluxo Eterno": {
    name: "Gota de Orvalho Sagrado",
    days: ["Qua", "Sáb", "Dom"],
    kind: "Arma",
    icon: "⚔",
  },
};
function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState("Arlecchino");
  const [selectedWeapon, setSelectedWeapon] = useState("Lança de Jade");
  const [saved, setSaved] = useState([
    { character: "Arlecchino", weapon: "Lança de Jade" },
  ]);
  const [notice, setNotice] = useState("");
  const activeCharacter = characters.find(
    (character) => character.name === selectedCharacter,
  )!;
  const activeItems = useMemo(
    () => [...activeCharacter.items, weapons[selectedWeapon]],
    [activeCharacter, selectedWeapon],
  );
  function addToAgenda() {
    const exists = saved.some(
      (item) =>
        item.character === selectedCharacter && item.weapon === selectedWeapon,
    );
    if (!exists)
      setSaved((current) => [
        ...current,
        { character: selectedCharacter, weapon: selectedWeapon },
      ]);
    setNotice(
      exists
        ? "Esta combinação já está na sua agenda."
        : "Personagem adicionado à agenda!",
    );
    window.setTimeout(() => setNotice(""), 2600);
  }
  return (
    <div className="app-shell">
     <LeftBar></LeftBar>
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
          <div className="selectors">
            <label>
              PERSONAGEM
              <select
                value={selectedCharacter}
                onChange={(event) => setSelectedCharacter(event.target.value)}
              >
                {characters.map((character) => (
                  <option key={character.name}>{character.name}</option>
                ))}
              </select>
            </label>
            <label>
              ARMA
              <select
                value={selectedWeapon}
                onChange={(event) => setSelectedWeapon(event.target.value)}
              >
                {Object.keys(weapons).map((weapon) => (
                  <option key={weapon}>{weapon}</option>
                ))}
              </select>
            </label>
            <button className="add-button" onClick={addToAgenda}>
              <span>+</span> Adicionar à agenda
            </button>
          </div>
          {notice && <p className="notice">✓ {notice}</p>}
          <div className="selection-preview">
            <div className="char-card">
              <div className="portrait pyro">♟</div>
              <div>
                <b>{activeCharacter.name}</b>
                <small>
                  {activeCharacter.element} · {activeCharacter.title}
                </small>
              </div>
            </div>
            <span className="plus">+</span>
            <div className="char-card">
              <div className="portrait gold">⚔</div>
              <div>
                <b>{selectedWeapon}</b>
                <small>Arma selecionada</small>
              </div>
            </div>
            <div className="auto-tag">
              ✦ Materiais detectados automaticamente
            </div>
          </div>
        </section>
        <Agenda items={activeItems} />
        <section className="saved-section">
          <div>
            <p className="eyebrow">EM ANDAMENTO</p>
            <h2>Seus planejamentos</h2>
          </div>
          <div className="saved-list">
            {saved.map((item) => (
              <div
                className="saved-item"
                key={`${item.character}-${item.weapon}`}
              >
                <span className="saved-spark">✦</span>
                <div>
                  <b>{item.character}</b>
                  <small>com {item.weapon}</small>
                </div>
                <span className="status">ATIVO</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
export default Home;
