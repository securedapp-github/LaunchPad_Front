import React from 'react';
import '../Style/contact.css';

function Contact(props) {
  const { theme } = props;

  return (
    <div style={{ backgroundImage: `${theme === 'Dark' ? 'linear-gradient(to right, black, rgb(14, 14, 61))' : 'linear-gradient(to right, #FBFBFB, #bff2d9)'}`, padding: '2vw 20vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="head" style={{ color: `${theme === 'Dark' ? 'white' : 'black'}`, borderBottom: `1px solid ${theme === 'Dark' ? 'white' : 'black'}`, marginBottom: '2vw' }}>Contact Us</h1>
      <form method="post" style={{ padding: '0 2%' }} action="">
        {/* Your form inputs go here */}
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '2vw' }}>
          <p>
            Email: <a href="mailto:your-email@example.com">your-email@example.com</a>
          </p>
        </div>
        <hr style={{ borderTop: '1px solid', width: '80%', margin: '0' }} />
        <div style={{ marginBottom: '2vw' }}>
          <p>
            Twitter: <a href="https://twitter.com/your-twitter">your-twitter</a>
          </p>
        </div>
        <hr style={{ borderTop: '1px solid', width: '80%', margin: '0' }} />
        <div style={{ marginBottom: '2vw' }}>
          <p>
            Telegram: <a href="https://t.me/your-telegram">your-telegram</a>
          </p>
        </div>
        <hr style={{ borderTop: '1px solid', width: '80%', margin: '0' }} />
        <div style={{ marginBottom: '2vw' }}>
          <p>
            Documentation: <a href="https://example.com/documentation">Documentation</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
