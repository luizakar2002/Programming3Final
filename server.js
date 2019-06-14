
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Monster = require("./modules/Monster.js");
var FirstCharacter = require("./modules/FirstCharacter.js");
var SecondCharacter = require("./modules/SecondCharacter.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
MonsterArr = [];
FirstCharacterArr = [];
SecondCharacterArr = [];
matrix = [];
grassHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, MonsterArr, FirstCharacterArr, SecondCharacterArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < MonsterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < FirstCharacterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < SecondCharacterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var mn = new Monster(x,y,3);
                MonsterArr.push(mn);
                
            }
            else if (matrix[y][x] == 4) {
                var mn = new FirstharacterArr(x,y,4);
                FirstharacterArr.push(mn);
                
            }
            else if (matrix[y][x] == 5) {
                var mn = new SecondCharacterArr(x,y,5);
                SecondCharacterArr.push(mn);
                
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }
    if (monsterArr[0] !== undefined) {
        for (var i in monsterArr) {
            MonsterArr[i].move();
            MonsterArr[i].eat();
            MonsterArr[i].mul();
            MonsterArr[i].die();
        }
    }
    if (frcharacterArr[0] !== undefined) {
        for (var i in frcharacterArr) {
            FirstCharacterArr[i].jump();
            FirstCharacterArr[i].eat();
            FirstCharacterArr[i].mul();
            FirstCharacterArr[i].die();
        }
    }
    if (sccharacterArr[0] !== undefined) {
        for (var i in sccharacterArr) {
            SecondCharacterArr[i].move();
            SecondCharacterArr[i].eat();
            SecondCharacterArr[i].mul();
            SecondCharacterArr[i].die();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)