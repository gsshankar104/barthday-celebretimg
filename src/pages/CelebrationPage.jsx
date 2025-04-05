import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { formatDate, daysUntilBirthday } from '../utils/helpers';
import { getCelebration } from '../services/googleAppsScript';
import '../styles/CelebrationPage.css';

const CelebrationPage = () => {
  const { id } = useParams();

  // State
  const [celebration, setCelebration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [sound, setSound] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  // Animation for main content - with immediate flag to make it visible immediately
  const contentAnimation = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? 'translateY(20px)' : 'translateY(0)',
    config: { tension: 280, friction: 20 },
    immediate: true, // This makes the animation apply immediately
  });

  // Animation for message reveal - with immediate flag to make it visible immediately
  const messageAnimation = useSpring({
    opacity: showMessage ? 1 : 0,
    transform: showMessage ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 280, friction: 20 },
    immediate: true, // This makes the animation apply immediately
  });

  // Fetch celebration data
  useEffect(() => {
    const fetchCelebration = async () => {
      try {
        setLoading(true);

        // Try to get data from localStorage
        const storedData = localStorage.getItem('celebrationData');

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Check if this is the correct celebration
          if (parsedData.id === id) {
            setCelebration(parsedData);
            return;
          }
        }

        // If we don't have the data in localStorage or it's for a different celebration,
        // we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockData = {
          id: id,
          name: 'राहुल शर्मा',
          date: '1990-05-15',
          message: 'प्रिय राहुल, आपके जन्मदिन पर आपको हार्दिक शुभकामनाएँ! आपका दिन खुशियों से भरा हो और आपके सभी सपने पूरे हों। आपकी हर इच्छा पूरी हो और आपका जीवन सुख, समृद्धि और स्वास्थ्य से भरा रहे। जन्मदिन मुबारक हो!',
          photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
          senderName: 'अनिल कुमार', // Add a default sender name
          createdAt: new Date().toISOString()
        };

        setCelebration(mockData);
      } catch (err) {
        console.error('Error fetching celebration:', err);
        setError('उत्सव डेटा प्राप्त करने में त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।');
      } finally {
        setLoading(false);
      }
    };

    fetchCelebration();
  }, [id]);

  // Initialize sound
  useEffect(() => {
    if (!loading && celebration) {
      // Initialize background music
      const birthdaySong = new Howl({
        src: ['/assets/audio/happy-birthday.mp3'],
        loop: true,
        volume: 0.5,
        autoplay: true,
      });

      setSound(birthdaySong);

      // Initialize confetti animation
      initConfetti();

      return () => {
        if (birthdaySong) {
          birthdaySong.stop();
        }
      };
    }
  }, [loading, celebration]);

  // Initialize confetti animation
  const initConfetti = () => {
    const confettiContainer = document.querySelector('.confetti-container');

    if (confettiContainer) {
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confettiContainer.appendChild(confetti);
      }
    }
  };

  // Get random color for confetti
  const getRandomColor = () => {
    const colors = ['#ff6b95', '#ffcc00', '#00cc99', '#66ccff', '#cc99ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Toggle sound
  const toggleSound = () => {
    if (sound) {
      if (isMuted) {
        sound.play();
      } else {
        sound.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Toggle message visibility
  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  // Share celebration
  const shareCelebration = () => {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    // Set its value to the current URL
    tempInput.value = window.location.href;
    // Add it to the DOM
    document.body.appendChild(tempInput);
    // Select its content
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Try to copy using document.execCommand (older but more compatible method)
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }

    // If document.execCommand failed, try using clipboard API
    if (!success) {
      try {
        navigator.clipboard.writeText(window.location.href);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    // Remove the temporary input
    document.body.removeChild(tempInput);

    // Show success or error message
    if (success) {
      // Show a success message
      const messageElement = document.createElement('div');
      messageElement.textContent = 'लिंक क्लिपबोर्ड पर कॉपी किया गया है!';
      messageElement.style.position = 'fixed';
      messageElement.style.bottom = '20px';
      messageElement.style.left = '50%';
      messageElement.style.transform = 'translateX(-50%)';
      messageElement.style.backgroundColor = '#4CAF50';
      messageElement.style.color = 'white';
      messageElement.style.padding = '10px 20px';
      messageElement.style.borderRadius = '4px';
      messageElement.style.zIndex = '1000';
      messageElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';

      document.body.appendChild(messageElement);

      // Remove the message after 3 seconds
      setTimeout(() => {
        if (document.body.contains(messageElement)) {
          document.body.removeChild(messageElement);
        }
      }, 3000);
    } else {
      // Show manual copy instructions
      alert('लिंक कॉपी करने में समस्या हुई\n\nकृपया इस URL को मैन्युअली कॉपी करें:\n' + window.location.href);
    }
  };

  // Calculate days until birthday
  const getDaysUntilBirthday = () => {
    if (celebration && celebration.date) {
      return daysUntilBirthday(celebration.date);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="celebration-page loading">
        <div className="loader"></div>
        <p>लोड हो रहा है...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="celebration-page error">
        <h2>त्रुटि</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!celebration) {
    return (
      <div className="celebration-page error">
        <h2>उत्सव नहीं मिला</h2>
        <p>यह उत्सव मौजूद नहीं है या हटा दिया गया है।</p>
      </div>
    );
  }

  const daysUntil = getDaysUntilBirthday();
  const isBirthdayToday = daysUntil === 0;

  // Force re-calculation of birthday status
  console.log('Days until birthday:', daysUntil);
  console.log('Is birthday today:', isBirthdayToday);

  // Check if the birthday is today, in the past, or in the future
  const getBirthdayStatus = () => {
    if (!celebration || !celebration.date) return 'future';

    const today = new Date();
    const birthday = new Date(celebration.date);

    // Compare only month and day (ignore year)
    const todayMonthDay = today.getMonth() * 100 + today.getDate();
    const birthdayMonthDay = birthday.getMonth() * 100 + birthday.getDate();

    if (todayMonthDay === birthdayMonthDay) {
      return 'today';
    } else if (todayMonthDay > birthdayMonthDay) {
      return 'past';
    } else {
      return 'future';
    }
  };

  const birthdayStatus = getBirthdayStatus();

  return (
    <animated.div className="celebration-page" style={contentAnimation}>
      <div className="confetti-container"></div>

      <div className="sound-toggle" onClick={toggleSound}>
        {isMuted ? (
          <span role="img" aria-label="Unmute">🔇</span>
        ) : (
          <span role="img" aria-label="Mute">🔊</span>
        )}
      </div>

      <div className="celebration-card">
        <div className="celebration-header">
          {birthdayStatus === 'today' ? (
            <h1>आज {celebration.name} का जन्मदिन है! जन्मदिन की शुभकामनाएँ!</h1>
          ) : birthdayStatus === 'past' ? (
            <h1>{celebration.name} का जन्मदिन इस साल मनाया जा चुका है!</h1>
          ) : (
            <h1>{celebration.name} के जन्मदिन में {daysUntil} दिन बाकी हैं!</h1>
          )}
          <p className="birthday-date">
            जन्मदिन: {formatDate(celebration.date)}
          </p>
        </div>

        <div className="celebration-photo">
          <img src={celebration.photoUrl} alt={celebration.name} />
        </div>

        <div className="celebration-actions">
          <button className="message-button" onClick={toggleMessage}>
            {showMessage ? 'संदेश छिपाएं' : 'विशेष संदेश देखें'}
          </button>

          <button className="share-button" onClick={shareCelebration}>
            <span role="img" aria-label="Share">🔗</span> साझा करें
          </button>
        </div>

        {showMessage && (
          <animated.div className="celebration-message" style={messageAnimation}>
            <p>{celebration.message}</p>
            {celebration.senderName && (
              <p className="sender-name">
                <span role="img" aria-label="From">❤️</span> शुभकामनाएँ देने वाले: {celebration.senderName}
              </p>
            )}
          </animated.div>
        )}
      </div>

      <div className="floating-balloons">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="balloon" style={{
            left: `${index * 20}%`,
            animationDelay: `${index * 0.5}s`
          }}></div>
        ))}
      </div>
    </animated.div>
  );
};

export default CelebrationPage;
