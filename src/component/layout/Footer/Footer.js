import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
  return (
    <footer id="footer">
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS Mobile Phones</p>
            <img src={playStore} alt="Playstore"/>
            <img src={appStore} alt="Appstore"/>
        </div>
        <div className="midFooter">
            <h1>ECOMMERCE.</h1>
            <p>High Quality is Our First Priority</p>
            <p>CopyRight 2021 &copy; Aditya</p>
        </div>
        <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/iam._.who._.iam_/">Instagram</a>
        <a href="https://www.linkedin.com/in/aditya-sharma-b33b381b5/">LinkedIn</a>
        <a href="https://www.facebook.com/profile.php?id=100008584875538">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer
