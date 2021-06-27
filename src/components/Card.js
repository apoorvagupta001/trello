import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

class Card extends Component {

  render() {
    const deleteCard = async () => {
        const { listId, card, dispatch } = this.props;

        dispatch({
            type: "DELETE_CARD",
            payload: { cardId: card._id, listId }
        });
    };
    const { card, index } = this.props;

    return (
     <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="Card"
          onMouseEnter={this.startHover}
          onMouseLeave={this.endHover}
        >
        <div className="Card-Title">
          <div className="Card-Title">
            {card.title}                        
          </div>
          <div className="Close-Button"><ion-icon name="close" size="large" onClick={deleteCard}></ion-icon></div>
        </div>
        <div className="Card-Description">
            {card.text}
          </div>
        </div>
      )}
    </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);