import React from 'react';
import '../../assets/style/popup.css';

const Popup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p>{message}</p>
        <div className="popup-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Sim</button>
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
