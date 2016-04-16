/*
 * Tyler Deans
 * April 16, 2016
 */



function MixinModel(_simModel) {
    // save a link to the model
    this.simModel = _simModel;
}

function getQuestionType() {
    var randNum = getRandomInt(1, 4); // random number between 1 and 3
    if (randNum == 1) {
        return "color";
    } else if (randNum == 2) {
        return "darken";
    } else {
        return "distance";
    }
}

function getColor() {
    var colors = ['blue', 'red', 'yellow', 'green', 'black', 'brown', 'white'];
    var index = getRandomInt(0, colors.length);
    return colors[index];
}

function getModuleString() {
    var module = "module Color\n";
    module += "  attr_accessor :color\n";
    module += "  def darken\n";
    module += '    self.color = \"dark\" + self.color\n';
    module += "  end\n";
    module += "  def distFromOrigin\n";
    module += "    Math.sqrt(x * x + y * y)\n";
    module += "  end\n";
    module += "end\n";

    return module;
}

function getClassString() {
    var classStr = "class Point\n";
    classStr += "  include Color\n";
    classStr += "  attr_accessor :x, :y\n";
    classStr += "  def initialize(x,y)\n";
    classStr += "    @x = x\n";
    classStr += "    @y = y\n";
    classStr += "  end\n";
    classStr += "end\n";

    return classStr;
}


MixinModel.prototype.evalMixinExpression = function() {
    var xPoint = getRandomInt(1, 5);
    var yPoint = getRandomInt(1, 5);
    var questionType = getQuestionType();

    this.mixinExpressionString = "<pre>" + getModuleString() + "\n";
    this.mixinExpressionString += getClassString() + "\n";
    this.mixinExpressionString += "p = Point.new(" + xPoint + ", " + yPoint + ")\n";

    if (questionType == "color") {

    } else if (questionType == "darken") {

    } else {

    }
}


MixinModel.prototype.getMixinExpression = function() {
    return this.mixinExpressionString;
}


