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
  
  //**************************************
  // edit pin
  //**************************************
  let editPin = (pin) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/pins/${pin.id}.json`, 
        JSON.stringify({
          title: pin.title,
          url: pin.url,
          imageUrl: pin.imageUrl,
          uid: pin.uid,
          boardId: pin.boardId
        })
        ).then((resultz) => {
          resolve(resultz);
        }).catch((error) => {
          reject(error);
        });
    });
  };

  //**************************************
  // delete pin
  //**************************************
  let deletePin = (pinId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
        .then((resultz) => {
          resolve(resultz);
        }).catch((error) => {
          reject(error);
        });

    });
  };

  return {getPinList:getPinList,
          postNewPin:postNewPin,
          editPin:editPin,
          deletePin:deletePin};

});