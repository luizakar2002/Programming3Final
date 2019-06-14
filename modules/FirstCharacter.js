var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class FirstCharacter extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
        this.energy = 15;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }



    jump() {


        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 3;
            MonsterArr.push(new Monster(this.x, this.y, 3));
            matrix[newY][newX] = this.index;
            for (var i in MonsterArr) {
                if (newX == MonsterArr[i].x && newY == MonsterArr[i].y) {
                    MonsterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }

    eat() {


        var newCell = this.chooseCell(3);
        var newCell1 = this.chooseCell(1);
        var merge = random(newCell.concat(newCell1))


        if (merge) {
            var newX = merge[0];
            var newY = merge[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in MonsterArr) {
                if (newX == MonsterArr[i].x && newY == MonsterArr[i].y) {
                    MonsterArr.splice(i, 1);
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

        if (this.energy >= 17 && newCell) {
            var newFirstCharacter = new FirstCharacter(newCell[0], newCell[1], this.index);
            FirstCharacterArr.push(newFirstCharacter);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 15;
        }
    }

    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0;
            for (var i in FirstCharacterArr) {
                if (this.x == FirstCharacterArr[i].x && this.y == FirstCharacterArr[i].y) {
                    FirstCharacterArr.splice(i, 1);
                    break;
                }
            }
        }
    }


}