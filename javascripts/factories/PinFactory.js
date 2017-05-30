
app.factory("PinFactory", function($http, $q, FIREBASE_CONFIG) {

  let getPinList = (boardId) => {
    let pinArray = [];
    return $q((resolve, reject) => {

      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
      .then((fbPins) => {
        let pinCollection = fbPins.data;
        console.log ("PinData" , pinCollection);
        if (pinCollection !== null) {

            Object.keys(pinCollection).forEach((key) => {
            pinCollection[key].id=key;
            pinArray.push(pinCollection[key]);
            console.log ("PinFactory array" , pinArray[0]);
          });
        }
        resolve(pinArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  return {getPinList:getPinList};

});