import "../styles/PrimaryButton.css";

import React from "react";

const PrimaryButton = ({ handleSave, saveLabel }) => (
    <div
      className="Primary-Button"
      style={{ backgroundColor: "#000000" }}
      onClick={handleSave}
    >
      {saveLabel}
    </div>
);

export default PrimaryButton;
