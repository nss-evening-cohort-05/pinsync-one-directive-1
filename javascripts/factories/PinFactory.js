app.factory("PinFactory", function($http, $q, FIREBASE_CONFIG) {

  let getPinList = (boardId) => {
    let pinArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
      .then((fbPins) => {
        let pinCollection = fbPins.data;
        if (pinCollection !== null) {
            Object.keys(pinCollection).forEach((key) => {
            pinCollection[key].id = key;
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

  let postNewPin = (newPin) => {
    return $q((resolve, reject) =>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, angular.toJson(newPin))
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

  let getSinglePin = (id) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins/${id}.json`)
      .then((results) => {
        results.data.id = id;
          resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


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

  return {getPinList:getPinList,
          getSinglePin:getSinglePin,
          postNewPin:postNewPin,
          FBdeletePin:FBdeletePin,
          editPin:editPin};

});