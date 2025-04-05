import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../styles/Header.css';

const Header = ({ themes, currentTheme, onThemeChange }) => {
  // Animation for header
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.header className="site-header" style={headerAnimation}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>जन्मदिन शुभकामनाएँ</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">होम</Link>
            </li>
            <li>
              <Link to="/create">नया बनाएँ</Link>
            </li>
          </ul>
        </nav>
        
        <div className="theme-selector">
          <label htmlFor="theme-select">थीम: </label>
          <select 
            id="theme-select" 
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value)}
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </animated.header>
  );
};

export default Header;
