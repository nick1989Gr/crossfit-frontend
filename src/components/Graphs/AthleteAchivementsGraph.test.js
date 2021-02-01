import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AthleteAchievementsGraph from "./AthleteAchievementsGraph";

const data = [
  {
    exerciseName: "Snatch",
    exerciseMeasurement: "Kg",
    achievements: [
      { ts: "2020-12-31T23:00:00.000+00:00", value: 100 },
      { ts: "2021-01-01T23:00:00.000+00:00", value: 101 },
      { ts: "2021-01-02T23:00:00.000+00:00", value: 110 },
      { ts: "2021-01-03T23:00:00.000+00:00", value: 90 },
      { ts: "2021-01-04T23:00:00.000+00:00", value: 115 },
      { ts: "2021-01-07T23:00:00.000+00:00", value: 120 },
      { ts: "2021-01-09T23:00:00.000+00:00", value: 122.5 },
      { ts: "2021-01-11T23:00:00.000+00:00", value: 125 },
      { ts: "2021-01-17T23:00:00.000+00:00", value: 130 },
      { ts: "2021-01-18T23:00:00.000+00:00", value: 114 },
      { ts: "2021-01-19T23:00:00.000+00:00", value: 97 },
      { ts: "2021-01-20T23:00:00.000+00:00", value: 100 },
      { ts: "2021-01-27T23:00:00.000+00:00", value: 98 },
    ],
  },
  {
    exerciseName: "Clean",
    exerciseMeasurement: "Kg",
    achievements: [
      { ts: "2020-12-31T23:00:00.000+00:00", value: 156 },
      { ts: "2021-01-01T23:00:00.000+00:00", value: 175 },
      { ts: "2021-01-02T23:00:00.000+00:00", value: 185 },
      { ts: "2021-01-03T23:00:00.000+00:00", value: 184 },
      { ts: "2021-01-04T23:00:00.000+00:00", value: 186 },
      { ts: "2021-01-07T23:00:00.000+00:00", value: 189 },
      { ts: "2021-01-09T23:00:00.000+00:00", value: 188 },
      { ts: "2021-01-11T23:00:00.000+00:00", value: 130 },
      { ts: "2021-01-17T23:00:00.000+00:00", value: 152 },
      { ts: "2021-01-18T23:00:00.000+00:00", value: 126 },
      { ts: "2021-01-19T23:00:00.000+00:00", value: 167 },
      { ts: "2021-01-20T23:00:00.000+00:00", value: 100 },
      { ts: "2021-01-27T23:00:00.000+00:00", value: 98 },
    ],
  },
  {
    exerciseName: "Burpees",
    exerciseMeasurement: "B/min",
    achievements: [
      { ts: "2020-12-31T23:00:00.000+00:00", value: 56 },
      { ts: "2021-01-01T23:00:00.000+00:00", value: 75 },
      { ts: "2021-01-02T23:00:00.000+00:00", value: 85 },
      { ts: "2021-01-03T23:00:00.000+00:00", value: 84 },
      { ts: "2021-01-04T23:00:00.000+00:00", value: 86 },
      { ts: "2021-01-07T23:00:00.000+00:00", value: 89 },
      { ts: "2021-01-09T23:00:00.000+00:00", value: 88 },
      { ts: "2021-01-11T23:00:00.000+00:00", value: 90 },
      { ts: "2021-01-17T23:00:00.000+00:00", value: 92 },
      { ts: "2021-01-18T23:00:00.000+00:00", value: 96 },
      { ts: "2021-01-19T23:00:00.000+00:00", value: 97 },
      { ts: "2021-01-20T23:00:00.000+00:00", value: 100 },
      { ts: "2021-01-27T23:00:00.000+00:00", value: 98 },
    ],
  },
];

describe("When data are correct", () => {
  it("Plot is available", () => {
    render(<AthleteAchievementsGraph data={data} />);
    expect(
      screen.queryByTestId("athlete-achievements-plot")
    ).toBeInTheDocument();
  });

  it("Legend is available", () => {
    render(<AthleteAchievementsGraph data={data} />);
    expect(screen.queryByTestId("legend")).toBeInTheDocument();
  });

  it("Legend Lines are available", () => {
    render(<AthleteAchievementsGraph data={data} />);
    expect(screen.getByText("Snatch(Kg)")).toBeInTheDocument();
    expect(screen.getByText("Clean(Kg)")).toBeInTheDocument();
    expect(screen.getByText("Burpees(B/min)")).toBeInTheDocument();
  });
});
