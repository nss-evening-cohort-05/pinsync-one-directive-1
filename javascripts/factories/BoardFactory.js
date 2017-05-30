app.factory("BoardFactory", function($http, $q, FIREBASE_CONFIG) {

  let getBoardList = () => {
    let boardArray = [];
    return $q((resolve, reject) => {

      $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="BCqP0wXysjMVi1P3JW7xTPXk0KC2"`)
      .then((fbBoards) => {
        let boardCollection = fbBoards.data;
        if (boardCollection !== null) {

            Object.keys(boardCollection).forEach((key) => {
            boardCollection[key].id=key;
            boardArray.push(boardCollection[key]);
            console.log ("BoardFactory array" , boardArray);
          });
        }
        resolve(boardArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  return {getBoardList:getBoardList};

});