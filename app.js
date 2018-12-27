/** config info **/
var GRID_LENGTH = 5;
var GRID_LENGTH_MI_ONE = GRID_LENGTH - 1;
var GRID_LENGTH_MI_LENGTH = 0;
var INCREMENT_COUNT = 1;
var DECREMENT_COUNT = -1;
var DIRECTION_ARRAY = { NORTH : 'NORTH', EAST : 'EAST', SOUTH : 'SOUTH', WEST : 'WEST' };
var ROTATE = { LEFT : 'LEFT', RIGHT : 'RIGHT' };
var COMMAND_ARRAY = { PLACE : 'PLACE', MOVE : 'MOVE', LEFT : 'LEFT', RIGHT : 'RIGHT', REPORT : 'REPORT' };

/** variable **/
var xPosition = null;
var yPosition = null;
var facePosition = null;
var isPosition = false; // initial -> default false

/** Input Array here **/
var inputArray = [
    [ COMMAND_ARRAY.PLACE, 0, 0, DIRECTION_ARRAY.NORTH ],
    [ COMMAND_ARRAY.MOVE ],
    [ COMMAND_ARRAY.REPORT ],
    [ COMMAND_ARRAY.PLACE, 0, 0, DIRECTION_ARRAY.NORTH ],
    [ COMMAND_ARRAY.LEFT ],
    [ COMMAND_ARRAY.REPORT ]
];

/***********************************************************/
console.log("***********************************************");
console.log("******************* Welcome  ******************");
console.log("***********************************************");
let commandIndex = 0;
let xIndex = 1;
let yIndex = 2;
let faceIndex = 3;

let i = 0;
let timeOut = 1000;
repeactLoop();

function repeactLoop() {

    setTimeout(function () {

        let oneRow = inputArray[i];
        let command = oneRow[commandIndex];

        // just print executed command **/
        console.log(oneRow.toString());

        if (command === COMMAND_ARRAY.PLACE) {
            let x = oneRow[xIndex];
            let y = oneRow[yIndex];
            let f = oneRow[faceIndex];
            isValidPosition(x, y, f);
        }

        if (command === COMMAND_ARRAY.MOVE) {
            move();
        }

        if (command === ROTATE.LEFT || command === ROTATE.RIGHT) {
            rotate(command);
        }

        if (command === COMMAND_ARRAY.REPORT) {
            report();
        }

        i++;
        if(i < inputArray.length){
            repeactLoop();
        }
    }, timeOut );
}

/***********************************************************/



/** is Valid position **/
function isValidPosition(x,y,f) {
    if(0 <= x <= GRID_LENGTH) {
        if(0 <= y <= GRID_LENGTH){
            if(DIRECTION_ARRAY[f]){
                xPosition = x;
                yPosition = y;
                facePosition = f;
                isPosition = true;
            }
        }
    }
}

/** move here **/
function move() {
    if(isPosition){
        var currentX = xPosition;
        var currentY = yPosition;
        var currentF = facePosition;
        if(DIRECTION_ARRAY[currentF]){
            if(currentF === DIRECTION_ARRAY.NORTH){
                if(currentY < GRID_LENGTH_MI_ONE){
                    yPosition = currentY + INCREMENT_COUNT;
                }
            }
            if(currentF === DIRECTION_ARRAY.EAST){
                if(currentX < GRID_LENGTH_MI_ONE){
                    xPosition = currentX + INCREMENT_COUNT;
                }
            }
            if(currentF === DIRECTION_ARRAY.NORTH){
                if(currentY > GRID_LENGTH_MI_LENGTH){
                    yPosition = currentY + DECREMENT_COUNT;
                }
            }
            if(currentF === DIRECTION_ARRAY.SOUTH){
                if(currentX > GRID_LENGTH_MI_LENGTH){
                    xPosition = currentX + DECREMENT_COUNT;
                }
            }
        }
    }
}

/** rotate here **/
function rotate(arg) {
    if(isPosition) {
        if (ROTATE[arg]) {
            if (arg === ROTATE.RIGHT) {
                if(facePosition === DIRECTION_ARRAY.NORTH){
                    facePosition = DIRECTION_ARRAY.EAST;
                }else if(facePosition === DIRECTION_ARRAY.EAST){
                    facePosition = DIRECTION_ARRAY.SOUTH;
                }else if(facePosition === DIRECTION_ARRAY.SOUTH){
                    facePosition = DIRECTION_ARRAY.WEST;
                }else if(facePosition === DIRECTION_ARRAY.WEST){
                    facePosition = DIRECTION_ARRAY.NORTH;
                }
            }
            if (arg === ROTATE.LEFT) {
                if(facePosition === DIRECTION_ARRAY.NORTH){
                    facePosition = DIRECTION_ARRAY.WEST;
                }else if(facePosition === DIRECTION_ARRAY.EAST){
                    facePosition = DIRECTION_ARRAY.NORTH;
                }else if(facePosition === DIRECTION_ARRAY.SOUTH){
                    facePosition = DIRECTION_ARRAY.EAST;
                }else if(facePosition === DIRECTION_ARRAY.WEST){
                    facePosition = DIRECTION_ARRAY.SOUTH;
                }
            }
        }
    }
}

/** report here **/
function report() {
    console.log(xPosition + "," + yPosition + "," + facePosition);
}
