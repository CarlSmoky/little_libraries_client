import React from 'react'

const AboutUs = () => {
  return (
    <div className="faq">
      <h2>Tips & Usage</h2>
      <h3>Registering new libraries</h3>
        <ul>
          <li>Make sure that you are logged in before registering a library</li>
          <li>The easiest way to select a library location is to type its adress into the search bar. Selecting a library with the search bar will drop a pin at the exact location and will pre-fill the library name field with the address</li>
          <li>You can also tap on the home map to drop a library pin manually</li>
          <li>Our current hosting provider will not permit location services on the site with mobile devices</li>
          <li>When you add a photo for a library, please take the photo in landscape if possible</li>
        </ul>
      <h3>Visiting a library</h3>
        <ul>
          <li>If you see a library that is already registered in the app, tap on the library on the map to see it's details page</li>
          <li>From the details page, tap 'record visit' to keep track of the libraries you've looked at</li>
          <li>You can also see how many people have visited that library and the time of yur last visit</li>
        </ul>
      <h3>User Page</h3>
        <ul>
          <li>Visit your user page by tapping the three horizonal lines at the top right corner of the screen, the tapping [Your Name]'s Page'</li>
          <li>Here you can see a list of all the libraries you've visited, with the most visited libraries at the top</li>
        </ul>
      <p>
      </p>
    </div>
  )
}

export default AboutUs
