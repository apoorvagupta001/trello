import "../styles/Board.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./List";
import AddList from "./AddList";
import PrimaryButton from "./PrimaryButton";

class Board extends Component {
    state = {
        addingList: false
    };
    handleDragEnd = ({ source, destination, type }) => {
        // dropped outside the allowed zones
        if (!destination) return;

        const { dispatch } = this.props;
        const { cards } = this.props;
        // Move card
        if (
        source.index !== destination.index ||
        source.droppableId !== destination.droppableId
        ) {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                sourceListId: source.droppableId,
                destListId: destination.droppableId,
                oldCardIndex: source.index,
                newCardIndex: destination.index,
                cardsList: cards
                }
            });
        }
    };
    
    toggleAddingList = () =>
        this.setState({ addingList: !this.state.addingList });

    render() {
    const { board } = this.props;
    const { addingList } = this.state;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="Board" ref={provided.innerRef}>
              {board.lists.map((listId, index) => {
                return <List listId={listId} key={listId} index={index} />;
              })}

              {provided.placeholder}

              <div className="Add-List">
                {addingList ? (
                  <AddList toggleAddingList={this.toggleAddingList} />
                ) : (
                  <PrimaryButton
                      handleSave={this.toggleAddingList}
                      saveLabel={"ADD LIST"}
                  ></PrimaryButton>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
    }

}

const mapStateToProps = state => ({ board: state.board , cards: state.cardsById});

export default connect(mapStateToProps)(Board);