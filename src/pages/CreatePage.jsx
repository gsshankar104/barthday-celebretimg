import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { validateForm } from '../utils/helpers';
import { submitCelebration } from '../services/googleAppsScript';
import '../styles/CreatePage.css';

const CreatePage = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    message: '',
    photo: null,
    senderName: '' // New field for sender's name
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // Animation for form - with immediate flag to make it visible immediately
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
    immediate: true, // This makes the animation apply immediately
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        photo: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error for this field if it exists
      if (errors.photo) {
        setErrors({
          ...errors,
          photo: ''
        });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Submit form
    try {
      setIsSubmitting(true);

      // In a real implementation, this would call the Google Apps Script API
      // For now, we'll simulate a successful response
      // const response = await submitCelebration(formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a random ID for the celebration
      const celebrationId = Math.random().toString(36).substring(2, 10);

      // Store form data in localStorage so we can access it on the celebration page
      const celebrationData = {
        id: celebrationId,
        name: formData.name,
        date: formData.date,
        message: formData.message,
        photoUrl: previewUrl || 'https://via.placeholder.com/200',
        senderName: formData.senderName || '', // Include sender's name
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('celebrationData', JSON.stringify(celebrationData));

      // Redirect to celebration page
      navigate(`/celebration/${celebrationId}`);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('फॉर्म जमा करने में त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Force render on mount
  useEffect(() => {
    // This is just to force a re-render
    setFormData({...formData});
  }, []);

  return (
    <div className="create-page">
      <h1>नया जन्मदिन संदेश बनाएँ</h1>

      <form className="celebration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">जन्मदिन वाले व्यक्ति का नाम</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="नाम दर्ज करें"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="date">जन्मदिन की तारीख</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="message">जन्मदिन संदेश</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="अपना संदेश यहाँ लिखें..."
            rows="5"
          ></textarea>
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="photo">फोटो अपलोड करें</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.photo && <div className="error-message">{errors.photo}</div>}

          {previewUrl && (
            <div className="photo-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="senderName">आपका नाम (वैकल्पिक)</label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            placeholder="अपना नाम यहां लिखें (वैकल्पिक)"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'प्रस्तुत कर रहा है...' : 'जन्मदिन संदेश बनाएँ'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
