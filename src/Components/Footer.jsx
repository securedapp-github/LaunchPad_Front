import React from "react";
import Logo from "../assets/logo.jpeg";
import '../Style/footer.css';

function Footer({ isBlankPage }) {
  const footerClassName = isBlankPage ? "footer-container fixed-footer" : "footer-container";
  return (
    <footer className={footerClassName}>
    <div className="footer-content">
      <div class="footer-column">
        <img src={Logo} alt="not found" width={300} height={69} />
        <p>
          Secure Your Smart Contracts with 
          SecureDapp Trusted Smart 
          Contract Audit Firm
        </p>
      </div>
      <div class="footer-column">
        <h4>Company</h4>
        <ul>
          <li><a href="#">Team</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Request a quote</a></li>
          <li><a href="#">Referral</a></li>
          <li><a href="#">Career</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Resource</h4>
        <ul>
          <li><a href="#">Solidity Shield</a></li>
          <li><a href="#">Audit Process</a></li>
          <li><a href="#">Our Services</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Workplace Policy</a></li>
          <li><a href="#">Our Mission & Core values</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Contact</h4>
        <p>#235, 2nd & 3rd Floor, 13th Cross Rd,<br/>
        Indira Nagar 2nd Stage, Hoysala<br/>
        Nagar, Indiranagar, Bengaluru,<br/>
        Karnataka 560038</p>
        <div class="footer-column">
          <ul class="social-icons">
            <li>
              <a href="https://www.facebook.com/profile.php?id=100089830892409" target="_blank" class="a-facebook" rel="noopener">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/securedapp/" target="_blank" class="a-linkedin" rel="noopener">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/securedapp_official?igshid=ZDdkNTZiNTM=" target="_blank" class="a-instagram" rel="noopener">
                <i class="fa fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <ul class="social-telegram">
            <li>
              <div class="wp-block-wptelegram-widget-join-channel aligncenter">
                <a href="https://t.me/secureDApp" class="components-button join-link is-large has-text has-icon" target="_blank" rel="noopener noreferrer">
                <i class="fa fa-telegram"></i>  Join @secureDApp
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Powered by Vettedcode Technologies India Private Limited</p>
    </div>
  </footer>
  );
}

export default Footer;
