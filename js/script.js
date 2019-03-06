(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqJxjbEyC2UCo4EwgrK89fRLur9vhfxyQ",
    authDomain: "mtg-trader-12f5e.firebaseapp.com",
    databaseURL: "https://mtg-trader-12f5e.firebaseio.com",
    projectId: "mtg-trader-12f5e",
    storageBucket: "mtg-trader-12f5e.appspot.com",
    messagingSenderId: "861838062847"
  };
  firebase.initializeApp(config);

  //Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  //Add Login event
  bynLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailPassowrd(email, pass);
    promise.catch(e => console.log(e.message))
  });

  //Add signup event
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: Check for real email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailPassowrd(email, pass);
    promise
      .catch(e => console.log(e.message))
  });
  //Signout Button Display
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOUt();
  });
  //Add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  })

  //Add signup event
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: Check for real email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailPassowrd(email, pass);
    promise
      .catch(e => console.log(e.message))
  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  })
}());
