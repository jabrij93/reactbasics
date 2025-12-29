import React from 'react';
import './PopupMessage.css';

const PopupMessage = ({ message, type }) => {
  return (
    <div className={`popup ${type}`}>
      <div className="popup-content">
        {type === 'success' && <i className="check circle icon"></i>}
        {type === 'error' && <i className="exclamation circle icon"></i>}
        {type === 'info' && <i className="info circle icon"></i>}
        {message}
      </div>
    </div>
  );
};

export default PopupMessage;