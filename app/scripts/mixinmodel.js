/*
 * Tyler Deans
 * March 18, 2016
 */



function MapModel(_simModel) {
    // save a link to the model
    this.simModel = _simModel;
}

function getQuestionType() {
    var randNum = getRandomInt(1, 5); // random number between 1 and 4
    var type = "";
    if (randNum === 1) {
        type = "arithmetic";
    } else if (randNum === 2) {
        type = "string";
    } else if (randNum === 3) {
        type = "head";
    } else {
        type = "null";
    }

    return type;
}
// returns the number of elements in a number list
function getNumOfElements() {
    // generate a number between 3 and 5
    return getRandomInt(3, 6);
}

// generates a list of numbers
// the length of the list is based on the numElements parameter
function numberListGenerator(numElements) {
    var list = [];
    for (var i = 0; i < numElements; i++) {
        list[i] = getRandomInt(0, 10); // the element will be number between 0 and 9
    }
    return list;
}

// The function creates a list of lists.
function doubleListGenerator() {
    var numOfElements = getRandomInt(1, 4);
    // each list is no longer that 3 elements
    var list1 = numberListGenerator(numOfElements);
    var list2 = numberListGenerator(numOfElements);
    var list3 = numberListGenerator(numOfElements);

    // creates a list of lists
    var list = [list1, list2, list3];
    return list;

}

function emptyListGenerator() {
    var emptyList = [];
    // the index of the empty list is randomly generated in a range between 0 and 2
    var index = getRandomInt(0, 3)
    var list = doubleListGenerator();
    list[index] = emptyList;
    return list;
}

function getRandomString(strList) {
    var index = getRandomInt(0, strList.length);
    return strList[index];
}

/*
 * The string list generator is similar to the number list generator
 * Except that the elements come from a large list of strings
 * The string from that list is picked randomly (index is randomly chosen)
 * Then the string is appended to the list
 *
 * A method to determine the question type (number or string)
 * returns a string (number or string)
 *
 */
function stringListGenerator() {
    var numOfElements = getNumOfElements();
    var stringList = ["soup", "dog", "orange", "park", "cat", "helps", "talks", "castle", "genius", "flaming"];
    var list = [];
    for (var i = 0; i < numOfElements; i++) {
        list[i] = getRandomString(stringList);
    }
    return list;
}

function getMathAnswer(operator, list, yVal) {
    if (operator === "+") {
        for (var i = 0; i < list.length; i++) {
            list[i] = list[i] + yVal;
        }
    } else {
        for (var i = 0; i < list.length; i++) {
            list[i] = list[i] * yVal;
        }
    }

    return list
}

function getStringAnswer(list) {
    var stringSizeList = [];
    for (var i = 0; i < list.length; i++) {
        stringSizeList.push(list[i].length);
    }

    return stringSizeList;

}

function getAdditionValue() {
    // returns a value between 1 and 9
    return getRandomInt(1, 10);
}

function getMultiplyValue() {
    // returns a value between 2 and 5
    return getRandomInt(2, 6);
}

// returns an array of boolean values
function getNullAnswer(list) {
    var booleanlist = [];
    for (var i = 0; i < list.length; i++) {
        var listStr = list[i].toString();
        if (list[i] === "[]") {
            booleanlist[i] = true;
        } else {
            booleanlist[i] = false;
        }
    }

    return booleanlist;
}

function getHeadOfList(list) {
    return list[0];
}

function setMathOperator() {
    var operator = "";
    var operatorType = getRandomInt(1, 3);
    if (operatorType === 1) {
        operator = "+";
    } else {
        operator = "*";
    }

    return operator;
}

function getMapFucntionString() {
    var mapString = "fun map (f,xs) =\n";
    mapString += "     case xs of\n";
    mapString += "         [] => []\n";
    mapString += "     | first::rest => (f first)::(map(f, rest))\n";
    return mapString;
}

MapModel.prototype.evalMapExpression = function() {
    this.mapExpressionString = "<pre>" + getMapFucntionString() + "\n";
    var question = getQuestionType();
    var answer = [];

    if (question === "arithmetic") {
        var operator = setMathOperator();
        var numElements = getNumOfElements();
        var numList = numberListGenerator(numElements);

        if (operator === "+") {
            var value = getAdditionValue();
            this.mapExpressionString += "val myList = " + "[";

            // displays the list in a formatted way
            for (var i = 0; i < numList.length; i++) {
                // if it is the last element print the string without the comma
                if (i == (numList.length - 1)) {
                    this.mapExpressionString += numList[i];
                } else { // otherwise print the string with the comma
                    this.mapExpressionString += numList[i] + ', ';
                }
            }
            this.mapExpressionString += "]\n";
            this.mapExpressionString += "val ans = map ((fn x => x + " + value + "), myList)</pre>";
            answer = getMathAnswer(numList, operator, value);

        } else {
            var value = getMultiplyValue();
            this.mapExpressionString += "val myList = " + "[";

            // displays the list in a formatted way
            for (var i = 0; i < numList.length; i++) {
                // if it is the last element print the string without the comma
                if (i == (numList.length - 1)) {
                    this.mapExpressionString += numList[i];
                } else { // otherwise print the string with the comma
                    this.mapExpressionString += numList[i] + ', ';
                }
            }
            this.mapExpressionString += "]\n";
            this.mapExpressionString += "val ans = map ((fn x => x * " + value + "), myList)</pre>";
            answer = getMathAnswer(numList, operator, value);
        }

    } else if (question === "string") {
        var strList = stringListGenerator();
        this.mapExpressionString += "val myList = " + "[";
        for (var i = 0; i < strList.length; i++) {
            // if it is the last element print the string without the comma
            if (i == (strList.length - 1)) {
                this.mapExpressionString += '"' + strList[i] + '"';
            } else { // otherwise print the string with the comma
                this.mapExpressionString += '"' + strList[i] + '", ';
            }
        }
        this.mapExpressionString += "]\n";
        this.mapExpressionString += "val ans = map (String.size, myList)</pre>";
        answer = getStringAnswer(strList);

    } else if (question === "head") {
        var numList = doubleListGenerator();
        this.mapExpressionString += "val myList = " + "[";
        for (var i = 0; i < numList.length; i++) {
            this.mapExpressionString += "[";
            for (var j = 0; j < numList[i].length; j++) {
                if (j == (numList[i].length - 1)) {
                    this.mapExpressionString += numList[i][j] + "]";
                } else { // otherwise print the string with the comma
                    this.mapExpressionString += numList[i][j] + ', ';
                }
            }

            // if it is the last element print the string without the comma
            if (i == (numList.length - 1)) {
                this.mapExpressionString += "]\n";
            } else { // otherwise print the string with the comma
                this.mapExpressionString += ', ';
            }
        }

        this.mapExpressionString += "val ans = map (hd, myList)</pre>";
        answer = getHeadOfList(numList);
    } else { // null question
        var numList = emptyListGenerator();
        this.mapExpressionString += "val myList = [";
        for (var i = 0; i < numList.length; i++) {
            if (numList[i].length == 0) {
                this.mapExpressionString += "[]";
            } else {
                this.mapExpressionString += "[";
                for (var j = 0; j < numList[i].length; j++) {
                    if (j == (numList[i].length - 1)) {
                        this.mapExpressionString += numList[i][j] + "]";
                    } else { // otherwise print the string with the comma
                        this.mapExpressionString += numList[i][j] + ', ';
                    }
                }
            }
            //if it is the last element print the string without the comma
            if (i == (numList.length - 1)) {
                this.mapExpressionString += "]\n";
            } else { // otherwise print the string with the comma
                this.mapExpressionString += ', ';
            }
        }
        
        this.mapExpressionString += "val ans = map (null, myList)</pre>";
        answer = getNullAnswer(numList);
    }
    return answer;
}
    

MapModel.prototype.getMapExpression = function() {
        return this.mapExpressionString;
}


