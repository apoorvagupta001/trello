import shortid from "shortid";

const store = store => {
  console.log("Insert first list");
  const firstListId = shortid.generate();

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: firstListId, listTitle: "Teams" }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardTitle: "Products",
      cardText: "3 pending tasks to be filled by Raj",
      creationTime: "2021-06-29T13:28:45.417Z"
    }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardTitle: "Sales",      
      cardText: "Send proposal to Puneet for sales prices",
      creationTime: "2021-06-28T13:28:45.417Z"      
    }
  });

  console.log("Insert second list");
  const secondListId = shortid.generate();

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: secondListId, listTitle: "Products" }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardTitle: "UAT testing",      
      cardText: "Ask engg to setup testing infra",
      creationTime: "2021-06-27T13:28:45.417Z"      
    }
  });
};

export default store;