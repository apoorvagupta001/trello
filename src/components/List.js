import "../styles/List.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { Droppable } from "react-beautiful-dnd";

import Card from "./Card";
import AddCard from "./AddCard";
import PrimaryButton from "./PrimaryButton";

class List extends Component {
state = {
  addingCard: false
};

toggleAddingCard = () =>
    this.setState({ addingCard: !this.state.addingCard });

    addCard = async (cardText, cardTitle) => {
        const { listId, dispatch } = this.props;

        this.toggleAddingCard();

        const cardId = shortid.generate();

        dispatch({
            type: "ADD_CARD",
            payload: { cardText, cardId, listId, cardTitle, creationTime: new Date() }
        });
    };
  render() {
    const { list } = this.props;
    const { addingCard } = this.state;

    let deleteList = async () => {
        const { list, dispatch } = this.props;
        const listId = list._id;
        dispatch({
            type: "DELETE_LIST",
            payload: { listId, cards: list.cards }
        });
    };
    return (
        <div className="List">
            <div className="List-Title">
                <div className="list-area">{list.title}</div>
                <div className="Close-Button"><ion-icon name="close" size="large" onClick={deleteList}></ion-icon></div>
            </div>
                <Droppable droppableId={list._id}>
                {(provided, _snapshot) => (
                    <div ref={provided.innerRef} className="Lists-Cards">
                        {list.cards &&
                        list.cards.map((cardId, index) => (
                            <Card
                            key={cardId}
                            cardId={cardId}
                            index={index}
                            listId={list._id}
                            />
                        ))}

                        {addingCard ? (
                        <AddCard
                            onSave={this.addCard}
                            onCancel={this.toggleAddingCard}
                            adding
                        />
                        ) : (
                        <PrimaryButton
                            handleSave={this.toggleAddingCard}
                            saveLabel={"Add card"}
                        ></PrimaryButton>
                        )}
                    </div>
                )}
                </Droppable>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(List);