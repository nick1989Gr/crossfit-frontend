import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalBarSeries,
} from "react-vis";

export const BarGraph = (props) => {
  const extractGraphFormattedData = (data) => {
    if (data.recordEntries) {
      return data.recordEntries.map((r) => {
        return { x: r.athleteName, y: r.record };
      });
    }
    return [];
  };

  return (
    <>
      <div data-testid="bar-graph">
        <XYPlot
          colorType="literal"
          xType="ordinal"
          width={400}
          height={200}
          margin={{ left: 50, right: 50 }}
        >
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45} className="main-fonts" />
          <YAxis className="main-fonts" />
          <ChartLabel className="alt-x-label" includeMargin={false} />
          <ChartLabel
            text={
              props.data.exerciseName +
              "(" +
              props.data.exerciseMeasurement +
              ")"
            }
            className="alt-y-label main-fonts"
            includeMargin={false}
            xPercent={-0.12}
            yPercent={0.8}
            style={{
              transform: "rotate(-90)",
              textAnchor: "center",
              fontWeight: "bold",
            }}
          />
          <VerticalBarSeries
            cluster="1"
            color={props.color}
            opacity={0.6}
            data={extractGraphFormattedData(props.data)}
          />
        </XYPlot>
      </div>
    </>
  );
};

export default BarGraph;
