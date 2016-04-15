/*
 * Tyler Deans
 * March 17, 2016
 */


function MapView(_simView) {
    // keep a link to the view
    this.simView = _simView;
}


/*
	draws expressions for the option view
*/

MapView.prototype.drawMapExpression = function(_map) {

    $('#mapDiv').append(_map.mapExpressionString);
}