import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../styles/HomePage.css';

const HomePage = () => {
  // Animation for content
  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
    delay: 200,
  });

  // Animation for image
  const imageAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 280, friction: 20 },
    delay: 400,
  });

  return (
    <div className="home-page">
      <div className="hero-section">
        <animated.div className="hero-content" style={contentAnimation}>
          <h1>अपने प्रियजनों के लिए विशेष जन्मदिन अनुभव बनाएँ</h1>
          <p>
            हमारी जन्मदिन शुभकामना वेबसाइट के साथ, आप अपने प्रियजनों के लिए एक अद्वितीय और यादगार जन्मदिन संदेश बना सकते हैं।
            बस कुछ विवरण दर्ज करें, एक फोटो अपलोड करें, और एक विशेष संदेश लिखें - हम बाकी सब कुछ संभाल लेंगे!
          </p>
          <p className="highlight-text">
            ✨ अपना नाम देकर व्यक्तिगत लिंक बनाएं और अपने प्रियजनों को आश्चर्यचकित करें! ✨
          </p>
          <div className="cta-buttons">
            <Link to="/create" className="button primary-button">
              अभी बनाएँ
            </Link>
            <a href="#features" className="button secondary-button">
              और जानें
            </a>
          </div>
        </animated.div>

        <animated.div className="hero-image" style={imageAnimation}>
          <img src="/assets/images/birthday-hero.jpg" alt="जन्मदिन उत्सव" />
        </animated.div>
      </div>

      <div id="features" className="features-section">
        <h2>विशेषताएँ</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎂</div>
            <h3>आकर्षक डिज़ाइन</h3>
            <p>सुंदर एनिमेशन और इंटरैक्टिव तत्वों के साथ आकर्षक जन्मदिन अनुभव।</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>साझा करने योग्य लिंक</h3>
            <p>अपने प्रियजनों के साथ साझा करने के लिए एक अद्वितीय लिंक प्राप्त करें।</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>अनुकूलन योग्य थीम</h3>
            <p>अपने प्रियजनों की पसंद के अनुसार विभिन्न थीम चुनें।</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>व्यक्तिगत संदेश</h3>
            <p>अपना नाम देकर व्यक्तिगत संदेश भेजें जो सेलिब्रेशन पेज पर दिखाई देगा।</p>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <h2>यह कैसे काम करता है</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>विवरण दर्ज करें</h3>
            <p>जन्मदिन वाले व्यक्ति का नाम, जन्मदिन की तारीख और एक फोटो अपलोड करें।</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>संदेश लिखें</h3>
            <p>अपने प्रियजनों के लिए एक व्यक्तिगत जन्मदिन संदेश लिखें।</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>लिंक साझा करें</h3>
            <p>अपने प्रियजनों के साथ अद्वितीय लिंक साझा करें और उन्हें आश्चर्यचकित करें!</p>
          </div>
        </div>

        <div className="cta-center">
          <Link to="/create" className="button primary-button">
            अभी बनाएँ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
