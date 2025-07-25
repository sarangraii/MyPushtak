// import React from 'react';
// import BookList from './components/BookList';
// import './styles/App.css';

// function App() {
//   return (
//     <div className="app">
//       <header className="header">
//         <h1>📚 MyPustak</h1>
//         <p>Discover Your Next Great Read</p>
//       </header>
//       <main className="container">
//         <BookList />
//       </main>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import BookList from './components/BookList';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      {/* Hero Header */}
      <header className="app-header">
        <h1>📚 MyPustak</h1>
        <p className="tagline">Discover Your Next Great Read – for Free or at Minimal Cost</p>
        <button className="cta-button">Explore Books</button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Featured Books */}
        <section className="section">
          {/* <h2>📘 Featured Books</h2> */}
          <BookList />
        </section>

        {/* About Us */}
        <section className="section about-section">
          <h2>🧾 About MyPustak</h2>
          <p>
            MyPustak is India’s pioneering platform that provides free books to those who need them. 
            Our goal is to bridge the education gap by promoting the reuse of books and spreading the joy of reading.
          </p>
        </section>

        {/* Testimonials */}
        <section className="section testimonials-section">
          <h2>💬 What Our Readers Say</h2>
          <div className="testimonial">
            <p>
              “Thanks to MyPustak, I got all my UPSC prep books at no cost. Truly a game-changer!” <br />
              <strong>- Priya S., Delhi</strong>
            </p>
          </div>
          <div className="testimonial">
            <p>
              “A noble initiative that’s spreading knowledge and love for reading. Highly recommended.” <br />
              <strong>- Rahul T., Pune</strong>
            </p>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section newsletter-section">
          <h2>📬 Subscribe to Our Newsletter</h2>
          <p>Stay updated on new arrivals, donation drives, and more!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </section>

        {/* Contact */}
        <section className="section contact-section">
          <h2>📞 Contact Us</h2>
          <p>Email: <a href="mailto:support@mypustak.com">sarang2452@gmail.com</a></p>
          <p>Phone: +91-7999862117</p>
          <p>Address: 256 Knowledge Street, Book City, Indore</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
          <a href="#contact">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} MyPustak. Empowering Minds Through Books.</p>
      </footer>
    </div>
  );
}

export default App;
