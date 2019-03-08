var cards = ["Lightning Bolt","Brainstorm","Black Lotus"];
var tradebinder = [];
var user = ["name", tradebinder];

function addToTradeBinder() {
  var x = document.getElementById("txtTradeCards").value;
  
  document.getElementById("demo").innerHTML = x;
}

function createCardTable(){

  var cardSearchInput;
  document.getElementById("search-button").addEventListener("click", setupTable());

  function setupTable(){
    var cardTable = document.createElement('table');
    cardTable.id = "table-of-return-cards";
    document.getElementById("card-holder-div").appendChild(cardTable);

    for(var i = 0; i < cards.length; i++){
      var cardName = cards[i];
      var completeCard = cardTableRow(cardName);
      cardTable.appendChild(completeCard);
    }
  }

  function cardTableRow(name){
    var cardRow = document.createElement('tr');
    cardRow.id = "return-card-row"

    var cardNameCol = document.createElement('td');
    cardNameCol.id = "return-card-col";
    cardNameCol.innerHTML = name;

    var cardPriceCol = document.createElement('td');
    cardPriceCol.id = "return-card-col";
    cardPriceCol.innerHTML = "999$";

    var cardLinkCol = document.createElement('td');
    cardLinkCol.id = "return-card-col";
    cardLinkCol.innerHTML = "google.com";

    var cardBtnCol = document.createElement('td');
    cardBtnCol.id = "return-card-col";

    var tradeNowButton = document.createElement('button');
    tradeNowButton.id = "return-card-btn";
    tradeNowButton.innerHTML = "Find " + name + " For Trade";

    cardBtnCol.innerHTML = tradeNowButton;

    cardRow.appendChild(cardNameCol);
    cardRow.appendChild(cardPriceCol);
    cardRow.appendChild(cardLinkCol);
    cardRow.appendChild(tradeNowButton);

    return cardRow;
  }
}
