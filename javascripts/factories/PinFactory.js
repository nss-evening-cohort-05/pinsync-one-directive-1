app.factory("PinFactory", function($http, $q, FIREBASE_CONFIG) {

  //**************************************
  // get pins list 
  //**************************************
  let getPinList = (boardId) => {
    let pinArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
      .then((fbPins) => {
        let pinCollection = fbPins.data;
        if (pinCollection !== null) {
            Object.keys(pinCollection).forEach((key) => {
            pinCollection[key].id=key;
            pinArray.push(pinCollection[key]);
          });
        }
        resolve(pinArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  // let getSinglePin = (id) => {
  //   return $q((resolve, reject) => {
  //     $http.get(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
  //     .then((resultz) => {

  //       console.log("Get Single Pin");

  //       //resultz.data.id = id;
  //       resolve(resultz);
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // };

  // To save pin, pass the pin from the partial to get 


  //**************************************
  // post new pin
  //**************************************
  let postNewPin = (newPin) => {
    return $q((resolve, reject) =>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify(newPin))
        .then((resultz) => {
          resolve(resultz);
        }).catch((error) => {
          reject(error);
        });
    });
  };
  

  let FBdeletePin = pinId => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
      .then(result => resolve(result))
      .catch(error => reject(error));
    });
  };

  return {getPinList:getPinList,
          postNewPin:postNewPin,
          FBdeletePin:FBdeletePin};

});