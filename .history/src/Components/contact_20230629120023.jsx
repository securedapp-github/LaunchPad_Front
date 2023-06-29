import React from 'react';
import '../Style/contact.css';

function Contact(props) {
  const { theme } = props;

  return (
    <div style={{ backgroundImage: `${theme === 'Dark' ? 'linear-gradient(to right, black, rgb(1, 14, 61))' : 'linear-gradient(to right, #FBFBFB, #bff2d9)'}`, padding: '2vw 2vw' }}>
      <h1 className="head" style={{ color: `${theme === 'Dark' ? 'white' : 'black'}`, borderBottom: `1px solid ${theme === 'Dark' ? 'white' : 'black'}` }}>Contact Us</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>
        
        <div style={{ marginTop: '2vw', textAlign: 'center' }}>
        <p>
          Email: <a href="mailto:your-email@example.com">your-email@example.com</a>
        </p>
        <hr style={{ borderTop: '2px solid white', margin: '1.5vw 0' }} />
        <p>
          Twitter: <a href="https://twitter.com/your-twitter">your-twitter</a>
        </p>
        <hr style={{ borderTop: '2px solid #f2f2f2', margin: '1.5vw 0' }} />
        <p>
          Telegram: <a href="https://t.me/your-telegram">your-telegram</a>
        </p>
        <hr style={{ borderTop: '2px solid #f2f2f2', margin: '1.5vw 0' }} />
        <p>
          Documentation: <a href="https://example.com/documentation">Documentation</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Contact;
