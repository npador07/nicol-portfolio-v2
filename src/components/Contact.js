import '../styles/Contact.css';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop auto-submit

    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address that ends with .com');
      return;
    }

    if (message.trim() === '') {
      alert('Please enter a message.');
      return;
    }

    // ✅ Passed validation
    alert('Form submitted successfully!');

    // If you’re using mailto:
    window.location.href = `mailto:npador07@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0AFrom: ${encodeURIComponent(email)}`;
  };

  return (
    <div className="container">
      <h2>Contact Me</h2>
      <section id="contact" className="contact">
        <div>
          
          <form id="contactForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />

            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
