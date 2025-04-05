import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>
          &copy; {currentYear} जन्मदिन शुभकामनाएँ | सभी अधिकार सुरक्षित
        </p>
        <div className="footer-links">
          <a href="#" onClick={(e) => e.preventDefault()}>गोपनीयता नीति</a>
          <a href="#" onClick={(e) => e.preventDefault()}>नियम और शर्तें</a>
          <a href="#" onClick={(e) => e.preventDefault()}>संपर्क करें</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
