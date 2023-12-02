import React from 'react'
import './aboutSection.css'
import profile from "../../../images/photo.jpg";
import { Button, Typography, Avatar } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/iam._.who._.iam_/"
  }
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component='h1'>About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src={profile}
              alt='Founder'
            />
            <Typography>Aditya Kumar</Typography>
            <Button onClick={visitInstagram} color='primary'>
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @aditya.For practising mern stack and learning its fundamentals.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component='h2'>Our Brands</Typography>
            <a href="https://www.instagram.com/iam._.who._.iam_/" target='blank'>
              <InstagramIcon className='instagramSvgIcon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
