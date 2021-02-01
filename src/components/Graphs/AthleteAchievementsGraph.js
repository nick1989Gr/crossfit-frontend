import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from "react-vis";
import { formatDate } from "../../utils/dateUtils";
import {
  EXERCISES_COLORS,
  EXERCISES_COLORS_MARKS,
} from "../Achievements/AchievementsMisc";
import DiscreteColorLegend from "react-vis/dist/legends/discrete-color-legend";

export const AthleteAchievementsGraph = (props) => {
  const extractData = (data) => {
    return data.map((e) => {
      return { x: formatDate(e.ts), y: e.value };
    });
  };

  const extractLegendLines = (data) => {
    return data.map((e) => {
      return {
        title: e.exerciseName + "(" + e.exerciseMeasurement + ")",
        color: EXERCISES_COLORS[e.exerciseName],
        strokeWidth: 6,
      };
    });
  };

  return (
    <div data-testid="athlete-achievements-plot">
      <XYPlot
        width={1200}
        height={400}
        xType="ordinal"
        margin={{ left: 50, right: 50, bottom: 75, top: 50 }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        {props.data.map((e) => (
          <LineMarkSeries
            key={e.exerciseName}
            className="linemark-series-example"
            style={{
              strokeWidth: "3px",
            }}
            lineStyle={{ stroke: EXERCISES_COLORS[e.exerciseName] }}
            markStyle={{ stroke: EXERCISES_COLORS_MARKS[e.exerciseName] }}
            data={extractData(e.achievements)}
          />
        ))}
      </XYPlot>
      <div data-testid="legend">
        <DiscreteColorLegend
          className="main-fonts text-aligned-center"
          orientation="horizontal"
          items={extractLegendLines(props.data)}
        />
      </div>
    </div>
  );
};

export default AthleteAchievementsGraph;
