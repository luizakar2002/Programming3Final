var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Monster extends LiveForm{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {

        //yntruma vandak
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy -= 2;

        }

    }


    eat() {


        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;

        }
    }



    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 10 && newCell) {
            var newMonster = new Monster(newCell[0], newCell[1], this.index);
            MonsterArr.push(newMonster);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8;
        }
    }

    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0;
            for (var i in MonsterArr) {
                if (this.x == MonsterArr[i].x && this.y == MonsterArr[i].y) {
                    MonsterArr.splice(i, 1);
                    break;
                }
            }
        }
    }


}