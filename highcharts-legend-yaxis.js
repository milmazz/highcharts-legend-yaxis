/**
 * @file Highcharts plugin that shows the legend boxes (rects) bellow the yAxis area.
 * Usage: Set showRects: false in the yAxis options to disable.
 * Default: true
 *
 * @author Milton Mazzarri <milmazz@gmail.com>
 * @copyright Milton Mazzarri 2014
 * @version 0.1.1
 */
(function (H) {
  "use strict";

  /**
   * @function positionRects
   *
   * @param {Object} obj - Represents the chart container.
   * @param {Object} yAxisGroup - Container of the rects per y-Axis.
   */
  var positionRects = function (obj, yAxisGroup) {
    var chart = obj,
      renderer = chart.renderer,
      yAxis = chart.yAxis,
      baselineOffset = 3, // Vertical offset from the baseline
      itemMarginTop = 5,
      rect = {
        width: 15,
        height: 3,
        radius: 0
      };

    yAxisGroup.add();

    H.each(yAxis, function (yAxis) {
      var opposite = yAxis.opposite === undefined ? false : yAxis.opposite,
        showRects = yAxis.showRects === undefined ? true : yAxis.showRects;

      if (showRects) {
        for (var i = 0; i < yAxis.series.length; i++) {
          if (yAxis.series[i].visible) {
            rect.x = yAxis.left + yAxis.offset;
            rect.x = (opposite) ? rect.x + yAxis.width : rect.x - rect.width;

            rect.y = yAxis.top + yAxis.height + baselineOffset + itemMarginTop * (i + 1);

            renderer.rect(rect.x,
              rect.y,
              rect.width,
              rect.height,
              rect.radius)
              .attr({
                fill: yAxis.series[i].color,
                zIndex: 8
              })
              .add(yAxisGroup);
          }
        }
      }
    });
  };

  H.wrap(H.Chart.prototype, "init", function (proceed) {

    // Run the original proceed method
    proceed.apply(this, Array.prototype.slice.call(arguments, 1));

    var chart = this,
      group = chart.renderer.g("yaxis-group");

    positionRects(chart, group);

    H.addEvent(chart, "endResize", function () {
      group.destroy(); // Destroy the container and free up memory
      group = chart.renderer.g("yaxis-group");
      positionRects(chart, group);
    });

  });
}(Highcharts));
