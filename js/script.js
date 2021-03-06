var cards = ["Lightning Bolt","Brainstorm","Black Lotus"];
var tradebinder = [];
var user = ["name", tradebinder];

// Get a reference to the database service
var database = firebase.database().ref();

// [START googlecallback]
function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      // [START googlecredential]
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // [END googlecredential]
      // Sign in with credential from the Google user.
      // [START authwithcred]
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END authwithcred]
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}
// [END googlecallback]
/**
 * Check that the given Google user is equals to the given Firebase user.
 */
// [START checksameuser]
function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}
// [END checksameuser]
/**
 * Handle the sign out button press.
 */
function handleSignOut() {
  var googleAuth = gapi.auth2.getAuthInstance();
  googleAuth.signOut().then(function() {
    firebase.auth().signOut();
  });
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('signout').disabled = false;
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('signout').disabled = true;

        // [END_EXCLUDE]
    }
  });
  // [END authstatelistener]
  document.getElementById('signout').addEventListener('click', handleSignOut, false);
}
function addToTradeBinder(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
window.onload = function() {
  initApp();
};

function updateTradeBinder() {
  var newDisplay = "";
  for (var i = 0; i < tradebinder.length; i++){
    var card = tradebinder[i];
    var x = newDisplay + (card["quantity"]) +" "+ (card["name"] +" "+ (card["condition"]) + "\n");
    newDisplay = x;
  }
  document.getElementById('txtTradeCards').value = newDisplay;
}
function addCardToList() {
  var cardName = document.getElementById("txtSearchCards").value;
  var quantity = document.getElementById("intSearchCardsQuantity").value;
  var condition = document.getElementById("cardCondition").value;
  var card = {"quantity": quantity, "name": cardName, "condition": condition};
  tradebinder.push(card);
  for (var i = 0; i < tradebinder.length; i++){
    console.log(tradebinder[i]);
  }
}
