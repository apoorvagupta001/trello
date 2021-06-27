import "../styles/AddCard.css";

import React, { Component } from "react";
import PrimaryButton from "./PrimaryButton";

class AddCard extends Component {
  state = {
    title: this.props.title || "",
    text: this.props.text || ""
    
  };

  handleChangeText = event => this.setState({ text: event.target.value });
  handleTitleText = event => this.setState({ title: event.target.value });

  render() {
    const { text, title } = this.state;
    const { onSave, adding } = this.props;

    return (
      <div className="Edit-Card">
        <div className="Card">
          <input type="text"
            className="Edit-Title-Textarea"
            placeholder="Enter title"
            value={title}
            onChange={this.handleTitleText}
          />
          <input type="text"
            className="Edit-Card-Textarea"
            placeholder="Enter the text for this card..."
            value={text}
            onChange={this.handleChangeText}
          />
        </div>
        <PrimaryButton
          handleSave={() => onSave(text, title)}
          saveLabel={adding ? "Add card" : "Save"}
        />
      </div>
    );
  }
}

export default AddCard;
