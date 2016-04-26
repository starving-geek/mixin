/*
 * Tyler Deans
 * April 26, 2016
 * questionbankmodel.js
 */


/*
 * Stores the questions, answers and the answer history
 */

function QuestionBankModel(_simModel, _numerator, _denominator) {
    // save a link to the model
    this.simModel = _simModel;
    // the number of questions the student needs to answer right...
    this.numerator = _numerator;
    // out of this many of the most recent questions asked
    this.denominator = _denominator;
    // we need to keep track of the last <x> answers we've gotten
    // so we can test for mastery. we use an array as a queue that
    // stores as many answers as we're willing to consider
    this.resetAnswerHistory();
    // create the question list
    this.createNewQuestions();
}


QuestionBankModel.prototype.resetAnswerHistory = function() {
    // start with an empty array
    this.answerHistory = [];
    // push a bunch of null objects into the history to represent questions
    // that haven't been asked yet
    for (var i = 0; i < this.denominator; i++) {
        this.answerHistory.push(null);
    }
}


/*
 * Add a new item to the back of the answer history, pull an item off
 * the front. Since the queue starts out filled with nulls, it is always
 * the same size.
 */
QuestionBankModel.prototype.updateAnswerHistory = function(newAnswer) {
    // add a new item to the back of the answer history
    this.answerHistory.push(newAnswer);
    // pull the oldest item off the front
    this.answerHistory.shift();
}


/*
 * Look at the answer history to see if we have met the criterion for
 * demonstrating mastery
 */
QuestionBankModel.prototype.masteryAchieved = function() {
    // count up the number of right answers
    var count = 0;
    // loop through the answer history
    for (var i = 0; i < this.answerHistory.length; i++) {
        // if we got the question right
        if (this.answerHistory[i]) {
            // increase our count
            count += 1;
        }
    }
    // compare the correct count to our goal
    return count >= this.numerator;
}



QuestionBankModel.prototype.checkAnswer = function(studentAnswer) {
    if (studentAnswer === "") {
        return false;
    } else if (studentAnswer.match(/^[0-9]+$/) != null) { // distance from origin question
        if (studentAnswer === this.answers.toString()) {
            return true;
        }
    } else if (studentAnswer.indexOf("dark") > -1 && studentAnswer.indexOf('.') == -1) { // darken question answer: dark (color)
        // checks if the answer is in double or single quotes
        if ( (/^'.*'$/.test(studentAnswer)) || (/^".*"$/.test(studentAnswer)) ) {
            // if the student uses single quotes
            if (studentAnswer.indexOf("'") == -1 ) {
                var studentAnswerSanQuote = studentAnswer.replace(/['"]+/g, '');
                if (studentAnswerSanQuote === this.answers) {
                    return true;
                }
             // if the student uses double quotes
            } else {
                var studentAnswerSanQuote = studentAnswer.replace(/["']+/g, '');
                if (studentAnswerSanQuote === this.answers) {
                    return true;
                }
            }

        }
    } else if ( (studentAnswer.indexOf('p') > -1) && (studentAnswer.indexOf('color') > -1) )  { // color question
        if (studentAnswer.indexOf("'") > -1) { // if the student's answer contains single quotes
            var studentAnswerDoubleQuote = studentAnswer.replace(/['"]+/g, '"'); // replace single quotes with double quotes
            if (studentAnswerDoubleQuote === this.answers) {
                return true;
            }
        } else {
            var studentAnswerSanQuote = studentAnswer.replace(/["']+/g, '');
            if (studentAnswer === this.answers) {
                return true;
            }
        }

    } else if ( (studentAnswer.indexOf('p') > -1) && (studentAnswer.indexOf('darken') > -1) ) { // other darken question answer: p.darken() or p.darken
        if (studentAnswer.indexOf("(") > -1 && studentAnswer.indexOf(")") > -1) { // checks if the student used parenthesis
            if (studentAnswer === this.answers) {
                return true;
            }

        } else { // no parenthesis
            answerSansPar = this.answers.replace("()", ''); // remove parenthesis
            if (studentAnswer === answerSansPar) {
                return true;
            }
        }

    } else {
        return false;
    }
}


/*
 * Create a new set of question templateString
 */
QuestionBankModel.prototype.createNewQuestions = function() {
    // Each question template is an array holding either strings
    // or executable commands stored as strings.
    this.questions = [
        ["Please indicate strings using double or single quotes. If the answer is a decimal, round the number to the nearest integer."],
        ["Please indicate strings using double or single quotes. If the answer is a decimal, round the number to the nearest integer."],
        ["Please indicate strings using double or single quotes. If the answer is a decimal, round the number to the nearest integer."],
        ["Please indicate strings using double or single quotes. If the answer is a decimal, round the number to the nearest integer."],
        ["Please indicate strings using double or single quotes. If the answer is a decimal, round the number to the nearest integer."]
    ];
    // the question index is used to rotate through the questions
    this.questionIndex = 0;
    // the answer(s) is/are stored in an array
    this.answers = [];
    // the actual question is stored in a string
    this.question = '';
}


/*
 * choose a random template and useit to construct a new question string
 */
QuestionBankModel.prototype.chooseQuestion = function(_firstQuestion, _lastQuestion) {
    // choose a question index at random
    this.questionIndex = 0;
    // get the corresponding question template
    var questionTemplate = this.questions[this.questionIndex];
    // start with an empty question string
    this.question = "";
    // loop through every line of the template
    for (index = 0; index < questionTemplate.length; index++) {
        // get the next line of the template
        var templateString = questionTemplate[index];
        // add it to the question string
        this.question = this.question + templateString;
    }
    return this.question;
}


/*
 * Set the answer(s) to the question indicated by questionIndex.
 * Right now I'm using a really clunky approach. I'm sure there's
 * a better way.
 */
QuestionBankModel.prototype.setAnswers = function(_mixin) {
    // Reset answers array
    this.answers = [];
    // Adds the answers to the question to the answers array
    // Set the answer(s) to the question indicated by questionIndex.

    if (this.questionIndex == 0) {
        this.answers = _mixin.evalMixinExpression();

    } else if (this.questionIndex == 1) {
        this.answers = _mixin.evalMixinExpression();

    } else if (this.questionIndex == 2) {
        this.answers = _mixin.evalMixinExpression();

    } else if (this.questionIndex == 3) {
        this.answers = _mixin.evalMixinExpression();
    } else {
        this.answers = _mixin.evalMixinExpression();
    }
}