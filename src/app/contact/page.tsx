import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto py-20 flex flex-col items-center">
      <div className="mb-5 text-center">
        <p className="text-green-500 text-lg font-semibold mb-2">
          Email: <a href="mailto:contact@zhuhanwen.com" className="text-blue-500 hover:underline">contact@zhuhanwen.com</a>
        </p>
      </div>
      <div className="mb-5 text-center">
        <p className="text-green-500 text-lg font-semibold mb-2">
          LinkedIn: <a href="https://www.linkedin.com/in/han-wen-zhu-020bb5282" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Zhu Han Wen
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
