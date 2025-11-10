import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-light-background rounded-lg shadow-sm p-4 dark:bg-dark-background">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Copyright */}
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-0">
          © 2025 Antonio Laudani. All Rights Reserved.
        </span>

        {/* Social Icons */}
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://www.linkedin.com/in/antonio-laudani-25aa3a229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-gray transition-colors"
            >
              <FaLinkedin className="w-5 h-5"/>
            </a>
          </li>
          <li>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-gray transition-colors"
            >
              <FaXTwitter className="w-5 h-5"/>
            </a>
          </li>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-gray transition-colors"
            >
              <FaGithub className="w-5 h-5"/>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
