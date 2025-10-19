import { useState } from "react";
//import "flowbite";
//import "../index.css"; // assicurati che tailwind sia importato

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // evita il refresh
    console.log("Form submitted:", { email, message });
  };

  return (
    <section className="w-full flex justify-center py-16 px-6">
      <div
        className="w-full max-w-lg p-6 sm:p-8 rounded-2xl 
                   bg-light-background shadow-md 
                   dark:bg-dark-background dark:shadow-dark-green-md 
                   transition-colors duration-300 animate-fadeIn"
      >
        {/* Titolo */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-light-gray dark:text-dark-gray">
          Contact Us
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-light-gray dark:text-dark-gray"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg 
                         border border-black 
                         dark:border-none dark:shadow-dark-green-sm 
                         bg-white dark:bg-dark-background 
                         text-gray-900 dark:text-dark-gray 
                         focus:ring-2 focus:ring-light-green dark:focus:ring-bright-green"
            />
          </div>

          {/* Messaggio */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-light-gray dark:text-dark-gray"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 rounded-lg 
                         border border-black 
                         dark:border-none dark:shadow-dark-green-sm 
                         bg-white dark:bg-dark-background 
                         text-gray-900 dark:text-dark-gray 
                         focus:ring-2 focus:ring-light-green dark:focus:ring-bright-green resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg font-medium 
                       text-white text-lg 
                       bg-light-green hover:bg-dark-green 
                       dark:bg-dark-green 
                       transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
