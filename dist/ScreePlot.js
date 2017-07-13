/*

@author: Arpit Narechania
@email: arpitnarechania@gmail.com
@project: d3-screeplot

Copyright (c) 2017 Arpit Narechania

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.

*/

function ScreePlot(options) {
    this.cssOptions = options;
    this.width = options.width; // Width of svg container
    this.height = options.height; // Height of svg container
    this.domElement = options.domElement; // DomElement ID to append to
    this.margin = options.margin; // Margins for the Graph

    this.showAxes = options.showAxes; // whether to show x,y axes
    this.showAxesLabels = options.showAxesLabels; // whether to show x,y axes
    this.showGridlines = options.showGridlines; // whether to show gridlines
    this.noOfGridlines = options.noOfGridlines; // no of gridlines to show
    this.nodeStroke = options.nodeStroke; // stroke Color of a Node
    this.nodeStrokeWidth = options.nodeStrokeWidth; // stroke Width of a Node
    this.arrowHeadType = options.arrowHeadType; // Possible types: single,single-reverse,two-way
    this.svgBackground = options.svgBackground; // Background of the svg chart.

    this.nodeTextColor = options.nodeTextColor; // font color of a node text

    this.barFill = options.barFill;
    this.barStroke = options.barStroke;
    this.barStrokeWidth = options.barStrokeWidth;
    this.selBarFill = options.selBarFill;
    this.selBarStroke = options.selBarStroke;
    this.selBarStrokeWidth = options.selBarStrokeWidth;

    this.circleFill = options.circleFill;
    this.circleStroke = options.circleStroke;
    this.circleStrokeWidth = options.circleStrokeWidth;
    this.selCircleFill = options.selCircleFill;
    this.selCircleStroke = options.selCircleStroke;
    this.selCircleStrokeWidth = options.selCircleStrokeWidth;

    this.lineStrokeWidth = options.lineStrokeWidth;
    this.filterLineStrokeWidth = options.filterLineStrokeWidth;

    this.svg = null;
    this.width = this.width - this.margin.left - this.margin.right;
    this.height = this.height - this.margin.top - this.margin.bottom;
    var parent = this;

    var changeNodeTextColor = function(preference){
        parent.nodeTextColor = preference;
        d3.selectAll(".cumulative_labels").attr("fill", parent.nodeTextColor);
    }

    var changeSVGBgColor = function(color){
        parent.svgBackground = color;
        parent.borderRect.style("fill", parent.svgBackground);
    }

    var changeBarFill = function(color){
        parent.barFill = color;
        d3.selectAll(".bar").attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selBarFill : parent.barFill });

        d3.selectAll(".cumulative")
        .attr("stroke",function(d){
            if(!d){
                return parent.barFill;
            }
            return d[1].factor <= parent.factorSelected ? parent.selBarFill : parent.barFill
        });

    }

    var changeBarStroke = function(color){
        parent.barStroke = color;
        d3.selectAll(".bar").attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selBarStroke : parent.barStroke });
    }

    var changeBarStrokeWidth = function(preference){
        parent.barStrokeWidth = preference;
        d3.selectAll(".bar").attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selBarStrokeWidth : parent.barStrokeWidth });
    }

    var changeSelBarFill = function(color){
        parent.selBarFill = color;
        d3.selectAll(".bar").attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selBarFill : parent.barFill });

        d3.selectAll(".cumulative")
        .attr("stroke",function(d){
            if(!d){
                return parent.barFill;
            }
            return d[1].factor <= parent.factorSelected ? parent.selBarFill : parent.barFill
        });
    }

    var changeSelBarStroke = function(color){
        parent.selBarStroke = color;
        d3.selectAll(".bar").attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selBarStroke : parent.barStroke });
    }

    var changeSelBarStrokeWidth = function(preference){
        parent.selBarStrokeWidth = preference;
        d3.selectAll(".bar").attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selBarStrokeWidth : parent.barStrokeWidth });
    }

    var changeCircleFill = function(color){
        parent.circleFill = color;
        d3.selectAll(".dotScreePlot").attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selCircleFill : parent.circleFill });
    }

    var changeCircleStroke = function(color){
        parent.circleStroke = color;
        d3.selectAll(".dotScreePlot").attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStroke : parent.circleStroke });
    }

    var changeCircleStrokeWidth = function(preference){
        parent.circleStrokeWidth = preference;
        d3.selectAll(".dotScreePlot").attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStrokeWidth : parent.circleStrokeWidth });
    }

    var changeSelCircleFill = function(color){
        parent.selCircleFill = color;
        d3.selectAll(".dotScreePlot").attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selCircleFill : parent.circleFill });
    }

    var changeSelCircleStroke = function(color){
        parent.selCircleStroke = color;
        d3.selectAll(".dotScreePlot").attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStroke : parent.circleStroke });
    }

    var changeSelCircleStrokeWidth = function(preference){
        parent.selCircleStrokeWidth = preference;
        d3.selectAll(".dotScreePlot").attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStrokeWidth : parent.circleStrokeWidth });
    }

    var changeLineStrokeWidth = function(preference){
        parent.lineStrokeWidth = preference;
        d3.selectAll(".cumulative").attr("stroke-width",parent.lineStrokeWidth);
    }

    var showGridlines = function(preference){
        parent.showGridlines = preference;
        if (!parent.showGridlines) {
            parent.x_gridlines.style("visibility", "hidden");
            parent.y_gridlines.style("visibility", "hidden");
        }
        else{
            parent.x_gridlines.style("visibility", "visible");
            parent.y_gridlines.style("visibility", "visible");
        }
    }

    var changeNoOfGridlines = function(preference){

        parent.noOfGridlines = preference;
        parent.y_gridlines.call(make_y_gridlines()
            .tickSize(-parent.width)
            .tickFormat(""));

        parent.x_gridlines.call(make_x_gridlines()
            .tickSize(-parent.height)
            .tickFormat(""));
    }

    var showAxes = function(preference){
        parent.showAxes = preference;
        if(parent.showAxes === "x"){
            parent.x_axis.style("visibility", "visible");
            parent.y_axis.style("visibility", "hidden");
        }
        else if(parent.showAxes === "y"){
            parent.y_axis.style("visibility", "visible");
            parent.x_axis.style("visibility", "hidden");
        }
        else if (!parent.showAxes) {
            parent.x_axis.style("visibility", "hidden");
            parent.y_axis.style("visibility", "hidden");
        }else{
            parent.x_axis.style("visibility", "visible");
            parent.y_axis.style("visibility", "visible");
        }
    }

    var showAxesLabels = function(preference){
        parent.showAxesLabels = preference;
        if (!parent.showAxesLabels) {
            parent.xAxisLabel.style("visibility", "hidden");
            parent.yAxisLabel.style("visibility", "hidden");
        }else{
            parent.xAxisLabel.style("visibility", "visible");
            parent.yAxisLabel.style("visibility", "visible");
        }
    }

    function initSVG(){

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        parent.svg = d3.select(parent.domElement).append("svg")
            .attr("width", parent.width + parent.margin.left + parent.margin.right)
            .attr("height", parent.height + parent.margin.top + parent.margin.bottom)
            .attr("class","screeplotSvg")
            .attr("viewBox", "0 0 " + (parent.width + parent.margin.left + parent.margin.right) + " " + (parent.height + parent.margin.top + parent.margin.bottom))

        parent.borderRect = parent.svg.append("rect")
            .attr("stroke","#000000")
            .attr("fill",parent.svgBackground)
            .attr("fill-opacity",0.5)
            .attr("stroke-width",0)
            .attr("width", parent.width)
            .attr("height",parent.height)
            .attr("transform","translate(" + parent.margin.left + "," + parent.margin.top + ")");

        // This aspect of code takes care of the Responsive nature of the div.
        var aspect = (parent.width + parent.margin.right + parent.margin.left) / (parent.height + parent.margin.top + parent.margin.bottom );
        $(window).on("resize", function() {
            var targetWidth = $(parent.domElement).width();

            if(!targetWidth){
                return;
            }

            // Otherwise the default settings of width and height will be compromised.
//            if (targetWidth > parent.width + parent.margin.right + parent.margin.left) {
//                return;
//            }

            var height =  $(parent.domElement).height();
            var aspectHeight =  Math.round(targetWidth / aspect);
            d3.select(".screeplotSvg")
                .attr("width", targetWidth)
                .attr("height", aspectHeight < height ? aspectHeight : height);

        }).trigger("resize");

        parent.g =  parent.svg.append("g")
            .attr("transform","translate(" + parent.margin.left + "," + parent.margin.top + ")");

    }

    function initScales() {

        // set the ranges
        parent.x = d3.scaleBand()
                  .range([0, parent.width])
                  .padding(0.1);
        parent.y = d3.scaleLinear()
                  .range([parent.height, 0]);

        parent.color = d3.scaleOrdinal(d3.schemeCategory20c);

        // define the line
        parent.valueline = d3.line()
            .x(function(d) { return parent.x(d.factor) + parent.x.bandwidth()/2; })
            .y(function(d) { return parent.y(d.cumulative_eigenvalue); });

    }

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(parent.x)
            .ticks(parent.noOfGridlines)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(parent.y)
            .ticks(parent.noOfGridlines)
    }

    function addXYAxis() {

        // add the x Axis
        parent.x_axis = parent.g.append("g")
              .attr("transform", "translate(0," + parent.height + ")");

        // add the y Axis
        parent.y_axis = parent.g.append("g");

        // text label for the x axis
        parent.xAxisLabel = parent.g.append("text")
            .attr("transform", "translate(" + (parent.width) + " ," + (parent.height) + ")")
            .attr("dy", "-0.5em")
            .attr("dx", "-0.5em")
            .style("text-anchor", "end")
            .attr("font-family", "sans-serif")
            .attr("font-size", "1em")
            .text("X Axis");

        // text label for the y axis
        parent.yAxisLabel = parent.g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", "0")
            .attr("x", "0")
            .attr("dy", "1.25em")
            .attr("dx", "-0.5em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "1em")
            .style("text-anchor", "end")
            .text("Y Axis");

    }

    function addXYGridLines() {

        // add the X gridlines
        parent.x_gridlines = parent.g.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + parent.height + ")");

        // add the Y gridlines
        parent.y_gridlines = parent.g.append("g")
          .attr("class", "grid");

    }

    function addUIElements(){

        parent.lineSegments = parent.g.selectAll(".cumulative");

        parent.crosshairLabelYPath = parent.g.append("rect")
            .style("fill", "#DDDDDD")
            .attr("width", 40)
            .attr("height", 15)
            .attr("fill-opacity",1)
            .style("visibility","hidden");

        parent.crosshairLabelXPath = parent.g.append("rect")
            .style("fill", "#DDDDDD")
            .attr("stroke","#DDDDDD")
            .attr("width", 40)
            .attr("height", 15)
            .attr("fill-opacity",1)
            .style("visibility","hidden");

        parent.crosshairLabelY = parent.g.append("text")
            .style("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "0.8em")

        parent.crosshairLabelX = parent.g.append("text")
            .style("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "0.8em")

        // create crosshairs
        parent.crosshair = parent.g.append("g")
          .attr("class", "line");

        // create horizontal line
        parent.crosshair.append("line")
          .attr("id", "crosshairX")
          .attr("class", "crosshair");

        // create vertical line
        parent.crosshair.append("line")
          .attr("id", "crosshairY")
          .attr("class", "crosshair");

        parent.filterLine = parent.g.append("g");
        parent.filterLine.append("line")
        .attr("class", "filterLine")
        .attr("stroke",parent.selBarFill)
        .attr("stroke-width",parent.filterLineStrokeWidth);

        parent.filterLabelXPath = parent.g.append("rect")
            .style("fill", "#1ab394")
            .attr("width", 40)
            .attr("height", 15)
            .attr("fill-opacity",1)
            .style("visibility","hidden");

        parent.filterLabelX = parent.g.append("text")
            .style("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "0.8em")
            .style("visibility","hidden");

        parent.crosshair_viewport = parent.g.append("rect")
          .attr("class", "overlay")
          .attr("width", parent.width)
          .attr("height", parent.height)
          .on("mouseover", function() {
            parent.crosshair.style("display", null);
            parent.crosshairLabelXPath.style("visibility","visible");
            parent.crosshairLabelYPath.style("visibility","visible");
          })
          .on("mouseout", function() {
            parent.crosshair.style("display", "none");
            parent.crosshairLabelXPath.style("visibility","hidden");
            parent.crosshairLabelYPath.style("visibility","hidden");
            parent.crosshairLabelY.text("");
            parent.crosshairLabelX.text("");

            d3.selectAll(".bar")
            .attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selBarFill : parent.barFill })
            .attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selBarStroke : parent.barStroke })
            .attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selBarStrokeWidth : parent.barStrokeWidth });

            d3.selectAll(".dotScreePlot")
            .attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selCircleFill : parent.circleFill })
            .attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStrokeWidth : parent.circleStrokeWidth })
            .attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStroke : parent.circleStroke })
            .attr("r",function(d){return d.factor <= parent.factorSelected ? parent.x.bandwidth()/2 : parent.x.bandwidth()/2.5 });

            d3.selectAll(".cumulative_labels")
            .attr("visibility",function(d){return d.factor <= parent.factorSelected ? "visible" : "hidden" });

            d3.selectAll(".cumulative")
            .attr("stroke",function(d){
                if(!d){
                    return parent.barFill;
                }
                return d[1].factor <= parent.factorSelected ? parent.selBarFill : parent.barFill
            });

          })
          .on("mousemove", function() {
            var mouse = d3.mouse(this);
            var mouseX = mouse[0];
            var mouseY = mouse[1];

            parent.crosshair.select("#crosshairX")
              .attr("x1", mouse[0])
              .attr("y1", 0)
              .attr("x2", mouse[0])
              .attr("y2", parent.height);

            parent.crosshair.select("#crosshairY")
              .attr("x1", 0)
              .attr("y1", mouse[1])
              .attr("x2", parent.width )
              .attr("y2", mouse[1]);

            var factor = parent.x.invert(mouseX+parent.x.bandwidth()/2 + (parent.x.bandwidth()*0.1)/2) - 1;

            parent.crosshairLabelX.attr("x",mouseX).attr("y",parent.y(115)-3.75).text(function() {
              return factor;
            });

            parent.crosshairLabelY.attr("x",-20).attr("y",mouseY+5).text(function() {
              return Math.floor(parent.y.invert(mouseY)*10)/10;
            });

            parent.crosshairLabelYPath.attr("transform","translate(" + (-40) + "," + (mouseY-7) + ")");
            parent.crosshairLabelXPath.attr("transform","translate(" + (mouseX - 20) + "," + (parent.y(115)-15) + ")");

            d3.selectAll(".bar")
            .attr("fill",function(d){return d.factor <= factor ? parent.selBarFill : parent.barFill })
            .attr("stroke",function(d){return d.factor <= factor ? parent.selBarStroke : parent.barStroke })
            .attr("stroke-width",function(d){return d.factor <= factor ? parent.selBarStrokeWidth : parent.barStrokeWidth });

            d3.selectAll(".dotScreePlot")
            .attr("fill",function(d){return d.factor <= factor ? parent.selCircleFill : parent.circleFill  })
            .attr("stroke-width",function(d){return d.factor <= factor ? parent.selCircleStrokeWidth : parent.circleStrokeWidth })
            .attr("stroke",function(d){return d.factor <= factor ? parent.selCircleStroke : parent.circleStroke })
            .attr("r",function(d){ return d.factor <= factor ? parent.x.bandwidth()/2 : parent.x.bandwidth()/2.5});

            d3.selectAll(".cumulative_labels")
            .attr("visibility",function(d){return d.factor <= factor ? "visible" : "hidden" });

            d3.selectAll(".cumulative")
            .attr("stroke",function(d){
                if(!d){
                    return parent.barFill;
                }
                return d[1].factor <= factor ? parent.selBarFill : parent.barFill
            });

          })
          .on("click", function() {
            mouse = d3.mouse(this);
            var mouseX = mouse[0];
            var mouseY = mouse[1];

            d3.select(".filterLine")
              .attr("x1", mouse[0])
              .attr("y1", 0)
              .attr("x2", mouse[0])
              .attr("y2", parent.height);

            parent.factorSelected = parent.x.invert(mouseX+parent.x.bandwidth()/2 + (parent.x.bandwidth()*0.1)/2) - 1;
            console.log(parent.factorSelected);

            parent.filterLabelX.style("visibility","visible").attr("x",mouseX).attr("y",parent.y(115)-3.75).text(function() {
              return parent.factorSelected;
            });
            parent.filterLabelXPath.style("visibility","visible").attr("transform","translate(" + (mouseX- 20) + "," + (parent.y(115)-15) + ")");
          });
    }

    var initialize = function() {
        initSVG();
        initScales();
        addXYAxis();
        addXYGridLines();
        addUIElements();
    }

    function render(dataset,options){

        parent.dataset = dataset;
        parent.dataOptions = options;
        parent.factorSelected = options.factorSelected;

        // format the data
        parent.dataset.forEach(function(d) {
            d.eigenvalue = +d.eigenvalue;
        });

        // Scale the range of the data in the domains
        var domain = parent.dataset.map(function(d) { return d.factor; });
        domain.push(domain[domain.length-1]+1);
        parent.x.domain(domain);
        parent.y.domain([0, 115]);

        // custom invert function
        parent.x.invert = (function(){
            var domain = parent.x.domain();
            var range = parent.x.range();
            var scale = d3.scaleQuantize().domain(range).range(domain);

            return function(x){
                return scale(x);
            }
        })();

        parent.x_axis.call(d3.axisBottom(parent.x));
        parent.y_axis.call(d3.axisLeft(parent.y));

        parent.x_gridlines.call(make_x_gridlines()
          .tickSize(-parent.height)
          .tickFormat(""));

        parent.y_gridlines.call(make_y_gridlines()
          .tickSize(-parent.width)
          .tickFormat(""));

        // append the rectangles for the bar chart
        parent.bars = parent.g.selectAll(".bar").data(parent.dataset,function(d){return d.factor});

        parent.bars.attr("fill",parent.barFill)
              .attr("x", function(d) { return parent.x(d.factor); })
              .attr("width", parent.x.bandwidth())
              .attr("y", function(d) { if(d.eigenvalue < 1){ return parent.height - 2;} else{return parent.y(d.eigenvalue);} })
              .attr("height", function(d) { if(d.eigenvalue < 1){return 2; } else{return parent.height - parent.y(d.eigenvalue);} })

        parent.bars.enter().append("rect")
              .attr("class","bar")
              .attr("fill",parent.barFill)
              .attr("x", function(d) { return parent.x(d.factor); })
              .attr("width", parent.x.bandwidth())
              .attr("y", function(d) { if(d.eigenvalue < 1){ return parent.height - 2;} else{return parent.y(d.eigenvalue);} })
              .attr("height", function(d) { if(d.eigenvalue < 1){return 2; } else{return parent.height - parent.y(d.eigenvalue);} })
              .merge(parent.bars);

        parent.bars.exit().remove();

        // Add the valueline path as multiple smaller segments
        d3.selectAll(".cumulative").remove();
        for(var i = 0; i< parent.dataset.length - 1; i++){
            parent.lineSegments = parent.lineSegments.data([parent.dataset.slice(i,i+2)],function(d){return d.factor;});

            parent.lineSegments.enter().append("path")
            .attr("class", "cumulative")
            .attr("d", parent.valueline)
            .attr("stroke",function(d){return parent.barFill;})
            .attr("stroke-width",function(d){return parent.lineStrokeWidth;});
        }

        // Add the scatterplot
        parent.scatterPoints = parent.g.selectAll(".dotScreePlot").data(parent.dataset,function(d){return d.factor+"-"+d.eigenvalue+"-"+d.cumulative_eigenvalue;});

        parent.scatterPoints
            .attr("r", parent.x.bandwidth()/2.5)
            .attr("fill",parent.circleFill)
            .attr("cx", function(d) { return parent.x(d.factor) + parent.x.bandwidth()/2; })
            .attr("cy", function(d) { return parent.y(d.cumulative_eigenvalue); })

        parent.scatterPoints.enter().append("circle")
            .attr("class","dotScreePlot")
            .attr("r", parent.x.bandwidth()/2.5)
            .attr("fill",parent.circleFill)
            .attr("cx", function(d) { return parent.x(d.factor) + parent.x.bandwidth()/2; })
            .attr("cy", function(d) { return parent.y(d.cumulative_eigenvalue); })
            .merge(parent.scatterPoints);

        parent.scatterPoints.exit().remove();

        parent.textLabels = parent.g.selectAll(".cumulative_labels").data(parent.dataset,function(d){return d.factor+"-"+d.eigenvalue+"-"+d.cumulative_eigenvalue;});

        parent.textLabels.text(function(d) { return Math.floor((d.cumulative_eigenvalue*10)/10) })
        .attr("x", function(d) { return parent.x(d.factor) + parent.x.bandwidth()/2; })
        .attr("y", function(d) { return parent.y(d.cumulative_eigenvalue); })
        .attr("font-size", (parent.x.bandwidth()/36) + "em")

        parent.textLabels.enter()
        .append("text")
        .attr("class","cumulative_labels")
        .attr("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("font-size", (parent.x.bandwidth()/36) + "em") // "0.7em"
        .attr("font-family", "sans-serif")
        .attr("fill", parent.nodeTextColor)
        .attr("dy", "0.25em")
        .attr("visibility","hidden")
        .attr("x", function(d) { return parent.x(d.factor) + parent.x.bandwidth()/2; })
        .attr("y", function(d) { return parent.y(d.cumulative_eigenvalue); })
        .text(function(d) { return Math.floor((d.cumulative_eigenvalue*10)/10)}).merge(parent.textLabels);

        parent.textLabels.exit().remove();

        parent.filterLine.lower();
        parent.scatterPoints.raise();
        parent.textLabels.raise();
        parent.crosshair.raise();
        parent.crosshair_viewport.raise();

        d3.selectAll(".bar")
            .attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selBarFill : parent.barFill })
            .attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selBarStroke : parent.barStroke })
            .attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selBarStrokeWidth : parent.barStrokeWidth });

        d3.selectAll(".dotScreePlot")
        .attr("fill",function(d){return d.factor <= parent.factorSelected ? parent.selCircleFill : parent.circleFill })
        .attr("stroke-width",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStrokeWidth : parent.circleStrokeWidth })
        .attr("stroke",function(d){return d.factor <= parent.factorSelected ? parent.selCircleStroke : parent.circleStroke })
        .attr("r",function(d){return d.factor <= parent.factorSelected ? parent.x.bandwidth()/2 : parent.x.bandwidth()/2.5 });

        d3.selectAll(".cumulative_labels")
        .attr("visibility",function(d){return d.factor <= parent.factorSelected ? "visible" : "hidden" });

        d3.selectAll(".cumulative")
        .attr("stroke",function(d){
            if(!d){
                return parent.barFill;
            }
            return d[1].factor <= parent.factorSelected ? parent.selBarFill : parent.barFill
        });

        d3.select(".filterLine")
          .attr("x1", parent.x(parent.factorSelected)+parent.x.bandwidth()/2)
          .attr("y1", 0)
          .attr("x2", parent.x(parent.factorSelected)+parent.x.bandwidth()/2)
          .attr("y2", parent.height);

        parent.filterLabelX.style("visibility","visible").attr("x",parent.x(parent.factorSelected)+parent.x.bandwidth()/2).attr("y",parent.y(115)-3.75).text(function() {
          return parent.factorSelected;
        });

        parent.filterLabelXPath.style("visibility","visible").attr("transform","translate(" + (parent.x(parent.factorSelected)+parent.x.bandwidth()/2-20) + "," + (parent.y(115)-15) + ")");

    }

    return {
        render: render,
        initialize: initialize,
        changeSVGBgColor: changeSVGBgColor,
        showGridlines:showGridlines,
        showAxes:showAxes,
        showAxesLabels:showAxesLabels,
        changeNoOfGridlines:changeNoOfGridlines,
        changeBarFill:changeBarFill,
        changeBarStroke:changeBarStroke,
        changeBarStrokeWidth:changeBarStrokeWidth,
        changeSelBarFill:changeSelBarFill,
        changeSelBarStroke:changeSelBarStroke,
        changeSelBarStrokeWidth:changeSelBarStrokeWidth,
        changeCircleFill:changeCircleFill,
        changeCircleStroke:changeCircleStroke,
        changeCircleStrokeWidth:changeCircleStrokeWidth,
        changeSelCircleFill:changeSelCircleFill,
        changeSelCircleStroke:changeSelCircleStroke,
        changeSelCircleStrokeWidth:changeSelCircleStrokeWidth,
        changeLineStrokeWidth:changeLineStrokeWidth,
        changeNodeTextColor:changeNodeTextColor
    }
}