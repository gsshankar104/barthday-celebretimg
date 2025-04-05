import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  // Animation for content
  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });
  
  return (
    <animated.div className="not-found-page" style={contentAnimation}>
      <div className="not-found-content">
        <h1>404</h1>
        <h2>पृष्ठ नहीं मिला</h2>
        <p>क्षमा करें, आपके द्वारा खोजा गया पृष्ठ मौजूद नहीं है।</p>
        <Link to="/" className="button home-button">
          होम पेज पर वापस जाएँ
        </Link>
      </div>
    </animated.div>
  );
};

export default NotFoundPage;
