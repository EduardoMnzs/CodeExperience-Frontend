import React, { useEffect, useState } from 'react';
import '../../assets/style/notification.css';

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        onClose();
      }, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const handleManualClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const notificationClass = type === 'success' ? 'notification-success' : 
                          type === 'error' ? 'notification-error' : 
                          'notification-info';

  return (
    <div className={`notification ${notificationClass} ${isVisible ? '' : 'fade-out'}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={handleManualClose}>×</button>
    </div>
  );
};

export default Notification;