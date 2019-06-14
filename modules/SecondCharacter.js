var LiveForm = require("./LiveForm");
var random = require("./random.js");




module.exports = class SecondCharacter extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
        this.energy = 20;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],

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
            this.energy--;

        }

    }





    eat() {


        var newCell = this.chooseCell(4);
        var newCell1 = this.chooseCell(1);
        var merge = random(newCell.concat(newCell1))


        if (merge) {
            var newX = merge[0];
            var newY = merge[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in FirstCharacterArr) {
                if (newX == FirstCharacterArr[i].x && newY == FirstCharacterArr[i].y) {
                    FirstCharacterArr.splice(i, 1);
                    break;
                }
            }

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
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

        if (this.energy >= 23 && newCell) {
            var newSecondCharacter = new SecondCharacter(newCell[0], newCell[1], this.index);
            SecondCharacterArr.push(newSecondCharacter);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 20;
        }
    }

    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0;
            for (var i in SecondCharacterArr) {
                if (this.x == SecondCharacterArr[i].x && this.y == SecondCharacterArr[i].y) {
                    SecondCharacterArr.splice(i, 1);
                    break;
                }
            }
        }
    }


}