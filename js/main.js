function changeSVGBgColor(element){
    screePlot.changeSVGBgColor(element.value);
}

function showAxes(element){
    screePlot.showAxes(element.checked);
}

function showAxesLabels(element){
    screePlot.showAxesLabels(element.checked);
}

function showGridlines(element){
    screePlot.showGridlines(element.checked);
}

function changeNoOfGridlines(element){
    screePlot.changeNoOfGridlines(element.value);
}

function changeNodeTextColor(element){
    screePlot.changeNodeTextColor(element.value);
}

function changeBarFill(element){
    screePlot.changeBarFill(element.value);
}

function changeBarStroke(element){
    screePlot.changeBarStroke(element.value);
}

function changeBarStrokeWidth(element){
    screePlot.changeBarStrokeWidth(element.value);
}

function changeSelBarFill(element){
    screePlot.changeSelBarFill(element.value);
}

function changeSelBarStroke(element){
    screePlot.changeSelBarStroke(element.value);
}

function changeSelBarStrokeWidth(element){
    screePlot.changeSelBarStrokeWidth(element.value);
}

function changeCircleFill(element){
    screePlot.changeCircleFill(element.value);
}

function changeCircleStroke(element){
    screePlot.changeCircleStroke(element.value);
}

function changeCircleStrokeWidth(element){
    screePlot.changeCircleStrokeWidth(element.value);
}

function changeSelCircleFill(element){
    screePlot.changeSelCircleFill(element.value);
}

function changeSelCircleStroke(element){
    screePlot.changeSelCircleStroke(element.value);
}

function changeSelCircleStrokeWidth(element){
    screePlot.changeSelCircleStrokeWidth(element.value);
}

function changeLineStrokeWidth(element){
    screePlot.changeLineStrokeWidth(element.value);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

    var screePlotCSSOptions = {
        domElement: "#screePlot",
        width: $('#screePlot').parent().width(),
        height: 550,
        margin:{top: 20,right: 20,bottom: 20,left: 35},
        showGridlines:true,
        noOfGridlines:10,
        showAxes:false,
        svgBackground:'#FFFFFF',
        barFill:'#3498db',
        barStroke:'#FFFFFF',
        barStrokeWidth:0,
        selBarFill:'#2ECC71',
        selBarStroke:'#FFFFFF',
        selBarStrokeWidth:0,
        circleFill:'#3498db',
        circleStroke:'#FFFFFF',
        circleStrokeWidth:1,
        selCircleFill:'#2ECC71',
        selCircleStroke:'#FFFFFF',
        selCircleStrokeWidth:1,
        lineStrokeWidth:2,
        filterLineStrokeWidth:2,
        nodeTextColor:"#ffff00"
    };

    var screePlotDataOptions = {
        factorSelected:3
    }

    var screePlot = new ScreePlot(screePlotCSSOptions);
    screePlot.initialize();
    screePlot.render(screePlotData,screePlotDataOptions);

    function refreshData(){
        screePlotData = [];
        no_of_factors = getRandomInt(3,25)
        var randomNo=60;
        for(var i=0; i< no_of_factors;i++){
            screePlotData.push({factor:i+1, eigenvalue:randomNo-Math.sqrt(i*70), cumulative_eigenvalue:randomNo+Math.sqrt(i*70)});
        }

        screePlotDataOptions.factorSelected = 3;
        screePlot.render(screePlotData,screePlotDataOptions);
    }
