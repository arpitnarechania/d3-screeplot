# d3-screeplot

**d3-screeplot** is an open-source JavaScript library for rendering Screeplots using the D3.js library.

Check out an [Example](https://arpitnarechania.github.io/d3-screeplot/) where you can test various configuration options.

# Installation

Using Bower:

```
bower install d3-screeplot --save
```

To use this library then, simply include d3.js, matrix.js and matrix.css:

``` html
<script src="/path/to/d3v4.min.js"></script>
<script src="/path/to/jquery-3.2.1.min.js"></script>
<script src="/path/to/dist/ScreePlot.css"></script>
<script src="/path/to/dist/ScreePlot.js"></script>
```

# Usage

To use this library, you must create a container element and instantiate a new
ScreePlot object:

```html
<div id="screePlot"></div>
```

Data in .json format
``` javascript
    var screePlotData = [
          {
            "factor": 1,
            "eigenvalue": 50,
            "cumulative_eigenvalue":50
          },
          {
            "factor": 2,
            "eigenvalue": 20,
            "cumulative_eigenvalue":70
        
          },
          {
            "factor": 3,
            "eigenvalue": 10,
            "cumulative_eigenvalue":80
        
          },
          {
            "factor": 4,
            "eigenvalue": 5,
            "cumulative_eigenvalue":85
        
          },
          {
            "factor": 5,
            "eigenvalue": 5,
            "cumulative_eigenvalue":90
        
          },
          {
            "factor": 6,
            "eigenvalue": 3,
            "cumulative_eigenvalue":93
        
          },
          {
            "factor": 7,
            "eigenvalue": 3,
            "cumulative_eigenvalue":96
        
          },
          {
            "factor": 8,
            "eigenvalue": 2,
            "cumulative_eigenvalue":98
        
          },
          {
            "factor": 9,
            "eigenvalue": 1,
            "cumulative_eigenvalue":99
        
          },
          {
            "factor": 10,
            "eigenvalue": 0.5,
            "cumulative_eigenvalue":99.5
        
          },
          {
            "factor": 11,
            "eigenvalue": 0.5,
            "cumulative_eigenvalue":100
        
          }
        ];
```

Setting chart parameters
``` javascript

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
    screePlot.initialize(); // initializes the SVG and UI elements
    screePlot.render(screePlotData,screePlotDataOptions); // Use this to render as well as update with new data and configurations.

```

## Options

| Option                     | Description                                                               | Type     | Example
| -------------------------- | ------------------------------------------------------------------------- | -------- | ----------------------------- |
| `domElement`               | The DOM element id/ class to append the chart to                          | string   | `#screePlot`                     |
| `width`                    | The width of the chart in pixels                                          | number   | `900`                         |
| `height`                   | The height of the chart in pixels                                         | number   | `500`                         |
| `margin.top`               | The top margin                                                            | number   | `75`                          |
| `margin.bottom`            | The bottom margin                                                         | number   | `50`                          |
| `margin.left`              | The left margin                                                           | number   | `100`                         |
| `margin.right`             | The right margin                                                          | number   | `50`                          |
| `showGridlines`            | Whether the gridlines are to be shown.                                    | bool     | `true`                        |
| `noOfGridlines`            | Approx number of gridlines to be shown                                    | number   | `10`                          |
| `showAxes`                 | Whether X/Y axes are to be shown                                          | bool     | `true`                        |
| `svgBackground`            | The color for the maximum value                                           | string   | `'blue'`                      |
| `barFill`                  | Fill color of the unselected bars                                         | string   | `'yellow'`                    |
| `barStroke`                | Stroke color of the unselected bars                                       | string   | `'#efefef'`                   |
| `barStrokeWidth`           | Stroke width of the unselected bars                                       | number   | `4`                           |
| `selBarFill`               | Fill color of the selected bars                                           | string   | `'#dcdcdc'`                   |
| `selBarStroke`             | Stroke color of the selected bars                                         | string   | `'orange'`                    |
| `selBarStrokeWidth`        | Stroke width of the selected bars                                         | number   | `4`                           |
| `circleFill`               | Fill color of the unselected circles                                      | string   | `'white'`                     |
| `circleStroke`             | Stroke color of the unselected circles                                    | string   | `'blue'`                      |
| `circleStrokeWidth`        | Stroke Width of the unselected circles                                    | number   | `2`                           |
| `selCircleFill`            | Fill color of the selected circles                                        | string   | `'blue'`                      |
| `selCircleStroke`          | Stroke color of the selected circles                                      | string   | `'blue'`                      |
| `selCircleStrokeWidth`     | Stroke Width of the selected circles                                      | number   | `3`                           |
| `lineStrokeWidth`          | Stroke Width of the Pareto line                                           | number   | `2`                           |
| `filterLineStrokeWidth`    | Stroke width of the Selector line                                         | number   | `4`                           |
| `nodeTextColor`            | Color of the text inside the circles                                      | string   | `'black'`                     |
| `factorSelected`           | Up to which bar to make a selection                                        | number   | `3`                           |

# Author

Arpit Narechania
arpitnarechania@gmail.com

# License

MIT license.