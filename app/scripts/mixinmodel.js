/*
 * Tyler Deans
 * April 26, 2016
 */
var randNum;
var number;

function MixinModel(_simModel) {
    // save a link to the model
    this.simModel = _simModel;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    if (randNum == null) {
       number = Math.floor(Math.random() * (max - min)) + min;
       randNum = number;
       return number;
    } else if (randNum === number) {
        number = Math.floor(Math.random() * (max - min)) + min;
        while(randNum === number) {
            number = Math.floor(Math.random() * (max - min)) + min;
        }
        randNum = number;
        return number;
    }

}

function getQuestionType() {
    var num = getRandomInt(1, 5); // random number between 1 and 4
    if (num == 1) {
        return "color";
    } else if (num == 2) {
        return "darken";
    } else if (num == 3) {
        return "dark color";
    } else {
        return "addUp";
    }
}

function getColor() {
    var colors = ['blue', 'red', 'yellow', 'green'];
    var index = getRandomInt(0, colors.length);
    return colors[index];
}

function getModuleString() {
    var module = "module Color\n";
    module += "  attr_accessor :color\n";
    module += "  def darken\n";
    module += '    self.color = \"dark\ " + self.color\n';
    module += "  end\n";
    module += "  def addUp\n";
    module += "    x + y\n";
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

function getDarkenAnswer() {
    return "p.darken()";
}

function getColorAnswer(color) {
    return 'p.color = "' + color + '"';
}
function getAddUpAnswer(x, y) {
    return x + y;
}

function getDarkenEvalAnswer(color) {
    return "dark " + color;
}


MixinModel.prototype.evalMixinExpression = function() {
    var xPoint = getRandomInt(1, 5);
    var yPoint = getRandomInt(1, 5);
    var questionType = getQuestionType();

    this.mixinExpressionString = "<pre>" + getModuleString() + "\n";
    this.mixinExpressionString += getClassString() + "\n";
    this.mixinExpressionString += "p = Point.new(" + xPoint + ", " + yPoint + ")\n";

    if (questionType == "color") {
        var color = getColor();
        this.mixinExpressionString += '</pre> <label id="rubyQuestion"> What Ruby command would set the color of p to ' + color + '?</label>';
        return getColorAnswer(color);

    } else if (questionType == "darken") {
        this.mixinExpressionString += '</pre> <label id="rubyQuestion"> What Ruby command would call the \"darken\" function on p?</label>';
        return getDarkenAnswer();

    } else if (questionType == "dark color") {
        var color = getColor();

        this.mixinExpressionString += "p.color = '" + color + "'\n";
        this.mixinExpressionString += "ans = p.darken()</pre> <label id=\"rubyQuestion\"> What would be assigned to ans after the Ruby code above is executed?</label>";
        return getDarkenEvalAnswer(color);

    } else {

        this.mixinExpressionString += "ans = p.addUp()</pre> <label id=\"rubyQuestion\"> What would be assigned to ans after the Ruby code above is executed?</label>";
        return getAddUpAnswer(xPoint, yPoint);
    }
}


MixinModel.prototype.getMixinExpression = function() {
    return this.mixinExpressionString;
}

