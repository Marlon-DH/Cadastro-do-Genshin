function NavBar() {
  return (  
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">✦</span>
        <span>
          Resin<span>ly</span>
        </span>
      </div>
      <nav>
        <a className="nav-link active">
          <span>▦</span> Minha agenda
        </a>
        <a className="nav-link">
          <span>◈</span> Personagens
        </a>
        <a className="nav-link">
          <span>⚔</span> Materiais
        </a>
      </nav>
      <div className="sidebar-footer">
        <div className="mini-avatar">D</div>
        <div>
          <b>Viajante</b>
          <small>AR 58</small>
        </div>
        <button>•••</button>
      </div>
    </aside>
  );
}
export default NavBar;
