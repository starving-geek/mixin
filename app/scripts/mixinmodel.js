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

function getModuleString() {
    var module = "module Color\n";
    module += "  attr_accessor :color\n";
    module += "  def darken\n";
    module += "    self.color = "dark " + self.color\n";
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
    this.mixinExpressionString = "<pre>" + getModuleString() + "\n";

}


MixinModel.prototype.getMixinExpression = function() {
        return this.mixinExpressionString;
}


