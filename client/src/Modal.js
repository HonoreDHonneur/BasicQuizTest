import React from "react";
import "./css/Modal.css";

const Modal = ({ show, handleClose, title, children, backgroundClass }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className={`modal-content ${backgroundClass}`}>
        {/* Instances of Modal for displaying each question and categorizing it based on trueü false or empty*/}
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
