/*
 * Tyler Deans
 * April 16, 2016
 */



function MixinModel(_simModel) {
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


MixinModel.prototype.evalMixinExpression = function() {
    this.mixinExpressionString = "<pre>" + "\n";

}


MixinModel.prototype.getMixinExpression = function() {
        return this.mixinExpressionString;
}


