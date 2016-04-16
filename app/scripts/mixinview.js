/*
 * Tyler Deans
 * April 16, 2016
 */


function MixinView(_simView) {
    // keep a link to the view
    this.simView = _simView;
}


/*
	draws expressions for the option view
*/

MixinView.prototype.drawMixinExpression = function(_mixin) {

    $('#mixinDiv').append(_mixin.mixinExpressionString);
}