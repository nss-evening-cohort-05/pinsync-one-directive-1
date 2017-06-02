app.factory("BoardFactory", function($http, $q, $routeParams, FIREBASE_CONFIG) {

  //THESE FUNCTIONS HAVE BEEN WRITTEN BUT NOT TESTED

  let FBgetSingleUserBoards = (userID) => {
    let boardArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userID}"`)
      .then((fbBoards) => {
        let boardCollection = fbBoards.data;
        if (boardCollection !== null) {
            Object.keys(boardCollection).forEach((key) => {
            boardCollection[key].boardId=key;
            boardArray.push(boardCollection[key]);
          });
        }
        resolve(boardArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let FBgetAllPublicBoards = () => {
    let boardArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json`)
      .then((fbBoards) => {
        let boardCollection = fbBoards.data;
        if (boardCollection !== null) {
            Object.keys(boardCollection).forEach((key) => {
            boardCollection[key].boardId=key;
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

  let FBgetSingleBoard = (bid, uid) => {
    let boardArray = [];
    let targetBoard = {};
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${uid}"`)
      .then((usersBoards) => {
        usersBoards = usersBoards.data;
        if (usersBoards !== null) {
            Object.keys(usersBoards).forEach((key) => {
            usersBoards[key].boardId = key;
            boardArray.push(usersBoards[key]);
            console.log ("BoardFactory array" , boardArray);
          });
        }
        boardArray.forEach(each => {
          if (each.boardId === bid) {
          targetBoard.push(each);
          }
        });
        resolve(targetBoard);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


  let FBpostNewBoard = newBoard => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`,
        JSON.stringify(newBoard))
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  let FBdeleteBoard = boardId => {
    console.log("FBdeleteBoard running. BoardId is", boardId);
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
      .then(result => resolve(result))
      .catch(error => reject(error));
    });
  };

  let FBeditBoard = board => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/boards/${board.boardId}.json`,
        JSON.stringify({
          boardId: board.boardId,
          uid: board.uid,
          title: board.title
        }))
      .then(result => resolve(result))
      .catch(error => reject(error));
    });
  };

  return {FBgetSingleUserBoards:FBgetSingleUserBoards, FBgetSingleBoard: FBgetSingleBoard, FBgetAllPublicBoards:FBgetAllPublicBoards, FBpostNewBoard:FBpostNewBoard, FBdeleteBoard: FBdeleteBoard, FBeditBoard:FBeditBoard};


});