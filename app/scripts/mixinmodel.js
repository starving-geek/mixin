/*
 * Tyler Deans
 * April 21, 2016
 */

function MixinModel(_simModel) {
    // save a link to the model
    this.simModel = _simModel;
}

function getQuestionType() {
    var randNum = getRandomInt(1, 5); // random number between 1 and 4
    if (randNum == 1) {
        return "color";
    } else if (randNum == 2) {
        return "darken";
    } else if (randNum == 3) {
        return "dark color";
    } else {
        return "distance";
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

function getDarkenAnswer() {
    return "p.darken()";
}

function getColorAnswer(color) {
    return 'p.color = "' + color + '"';
}
function getDistanceAnswer(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
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
        this.mixinExpressionString += "What Ruby command would set the color of p to " + color + "\n</pre>";
        return getColorAnswer(color);

    } else if (questionType == "darken") {
        this.mixinExpressionString += 'What Ruby command would call the \"darken\" function on p?</pre>';
        return getDarkenAnswer();

    } else if (questionType == "dark color") {
        var color = getColor();
        this.mixinExpressionString += "What would be assigned to ans after the following Ruby code is executed?\n";
        this.mixinExpressionString += "p.color = '" + color + "'\n";
        this.mixinExpressionString += "ans = p.darken()</pre>";
        return getDarkenEvalAnswer(color);

    } else {
        this.mixinExpressionString += "What would be assigned to ans after the following Ruby code is executed?\n";
        this.mixinExpressionString += "ans = p.distFromOrigin()</pre>";
        return getDistanceAnswer(xPoint, yPoint);
    }
}


MixinModel.prototype.getMixinExpression = function() {
    return this.mixinExpressionString;
}

