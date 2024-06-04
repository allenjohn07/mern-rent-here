import React from 'react'
import '../Components/Styles/Footer.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-section'>
          <h3 className='footer-title'>Rent <span className='text-blue'>Here</span></h3>
          <p>Find your perfect home with us.</p>
        </div>
        <div className='footer-section'>
          <h4 className='footer-subtitle'>Quick Links</h4>
          <ul className='footer-links'>
            <li><a href='/'>Home</a></li>
            <li><a href='/'>About Us</a></li>
          </ul>
        </div>
        <div className='footer-section'>
          <h4 className='footer-subtitle'>Contact Us</h4>
          <p>Email: info@renthere.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>
        <div className='footer-section'>
          <h4 className='footer-subtitle'>Follow Us</h4>
          <div className='footer-social'>
            <a href='#'><FaFacebook /></a>
            <a href='#'><FaTwitter /></a>
            <a href='#'><FaInstagram /></a>
            <a href='#'><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 Rent Here. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;