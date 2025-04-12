// src/components/Alert.jsx
import React, { useEffect, useState } from 'react';

function Alert({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose(); // Call the onClose function after alert disappears
      }, 3000); // Alert stays for 3 seconds

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
      {message}
    </div>
  );
}

export default Alert;
