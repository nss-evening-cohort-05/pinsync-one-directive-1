app.factory("AuthFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {  

  let currentUserData = null; // tied to authenticateGoogle

  let isAuthenticated = () => {
    return firebase.auth().currentUser ? true : false;
  };

  let getUser = () => {
    return firebase.auth().currentUser;
  };

  let logout = () => {
    firebase.auth().signOut();
  };

  let authenticate = (credentials) => {
    return $q((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let registerWithEmail = (user) => {
    return $q((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let authenticateGoogle = () => {
    return $q((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider(); // GoogleAuthProvider changes depending on what login used
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
          currentUserData = authData.user;
          resolve(currentUserData);
        }).catch((error) => {
          reject(error);
        });
    });
  };

  return { 
    isAuthenticated:isAuthenticated, 
    getUser:getUser, 
    logout:logout,
    registerWithEmail:registerWithEmail,
    authenticate:authenticate, 
    authenticateGoogle:authenticateGoogle 
  };

});