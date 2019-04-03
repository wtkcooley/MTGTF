var cards = []; //Creates Empty Array For Card Names

var database = firebase.database().ref(); //Gets Reference Of The database


/* On Load in or Refresh, Event Listener Triggers and calls the Load Database Function */
window.addEventListener("load", function() {
  //initApp();
  loadDB();
});


/* Function calls the Database Reference and Pulls all Card Name Values and Stores THem in DB*/
function loadDB() {
  database.on('value', function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      var cardSnapshot = childSnapshot.val();
      for(var i = 0; i < cardSnapshot.length; i++) {
        cards.push(cardSnapshot[i]);
      }
    });
  });
}


// console.log(cards); logs Cards To Console, Test/Bug Fix Code


/* Holds All Sub-Function and Variables for Returning Cards from the Search Bar
    DO NOT EDIT
    DO NOT EDIT
 */
function returnCards(){

  document.getElementById("search-button").addEventListener("click", cardSearchFunc()); // Listens for the Search Button to be CLicked


  /* EXPERIMENTAL Code
      Purpose is to open the serach.html doc
      and return all search results there.
      uses a interval to see if search page
      is loaded them begins to write

      CURRENTLY NOT WORKING */
  function goToSearch() {
    var searchText = document.getElementById("cardSearchInput").value;

    location.assign("http://localhost:5000/search.html");
    for(var i = 0; i < 100; i++) {
      var readyStateCheckInterval = setInterval(function() {
        if (window.readyState === "complete") {
          clearInterval(readyStateCheckInterval);
          cardSearchFunc(searchVal);
        }
      }, 10);
    }
  }

  /* First Function Called
      Gets the value of the Search Bar Input
      Calls removeNodes function
      Calls setupTable function */
  function cardSearchFunc() {
    // document.getElementById("cardSearchInput").value = searchVal;
    removeNodes();
    setupTable();
  }


  /* Removes ALl Previously Generated Nodes on the Screen */
  function removeNodes() {
    var remNode = document.getElementById('table-of-return-cards');
    if(remNode != null){
      remNode.remove();
    }
  }


  /* Creates the Table and Table Header
      Checks to see if there is any value inside of the Search Field
      If true, searches through DB Ref for Cards that include the search
      If false, removes nodes and alerts user to enter a string
      If no cards match Keyword, User is alerted to try another string */
  function setupTable() {
    var searchText = document.getElementById("cardSearchInput").value;
    var cardTable = document.createElement('TABLE');
    cardTable.id = "table-of-return-cards";
    document.getElementById("card-holder-div").appendChild(cardTable);

    var cardRow = document.createElement('tr');
    cardRow.id = "return-card-row";

    var cardNameHeadCol = document.createElement('th');
    cardNameHeadCol.id = "return-card-header";
    cardNameHeadCol.innerHTML = "NAME";

    var cardCostHeadCol = document.createElement('th');
    cardCostHeadCol.id = "return-card-header";
    cardCostHeadCol.innerHTML = "COST";

    var cardBtnHeadCol = document.createElement('th');
    cardBtnHeadCol.id = "return-card-header";
    cardBtnHeadCol.innerHTML = "FIND TRADE";

    cardRow.appendChild(cardNameHeadCol);
    cardRow.appendChild(cardCostHeadCol);
    // cardRow.appendChild(cardLinkHeadCol);
    cardRow.appendChild(cardBtnHeadCol);

    cardTable.appendChild(cardRow);

    if (!searchText) {
      noCardValEntered();
      removeNodes();
    } else {
      var numReturnCards = 0;

      for(var i = 0; i < cards.length; i++){
        var cardName = cards[i];

        var cardNameMod = cardName.toLowerCase();
        //cardNameMod = cardNameMod.replace(/ /g, "\\$&");

        var searchTextMod = searchText.toLowerCase(); // $& means the whole matched string
        //searchTextMod = searchTextMod.replace(/ /g, "\\$&"); // $& means the whole matched string

        if(cardNameMod.includes(searchTextMod)){
          var completeCard = cardTableRow(cardName);
          cardTable.appendChild(completeCard);
          numReturnCards++;
        }
      }

      if(numReturnCards==0){
        noCardFound();
        removeNodes();
      }
    }
  }

  /* Creates a Row with Card Name, Cost, and Trade Find Button
      returns the Completed Row to the Table */
  function cardTableRow(name){
    var cardRow = document.createElement('tr');
    cardRow.id = "return-card-row";

    var cardNameCol = document.createElement('TD');
    cardNameCol.id = "return-card-col";
    cardNameCol.innerHTML = name;
    cardRow.appendChild(cardNameCol);

    var cardPriceCol = document.createElement('TD');
    cardPriceCol.id = "return-card-col";
    cardPriceCol.innerHTML = "999$";
    cardRow.appendChild(cardPriceCol);

    var cardBtnCol = document.createElement('TD');
    cardBtnCol.id = "return-card-col";

    var tradeNowButton = document.createElement('button');
    tradeNowButton.id = "return-card-btn";
    tradeNowButton.innerHTML = "Find " + name.italics().bold() + " For Trade";

    //cardBtnCol.innerHTML = tradeNowButton;
    cardRow.appendChild(cardBtnCol);
    cardBtnCol.appendChild(tradeNowButton);

    return cardRow;
  }

  /* Alerts User when no Value is Entered in Search Box */
  function noCardValEntered() {
    alert("Enter Card Name in Search Box");
  }
  /*  Alerts User When no Card is Found */
  function noCardFound() {
    alert("No Cards Found, Please Try a Different Search Keyword");
  }
}
