import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AthleteAchievementsGraph from "./AthleteAchievementsGraph";

const defaultProps = {
  data: [
    {
      exerciseName: "Snatch",
      exerciseMeasurement: "Kg",
      achievements: [
        { ts: "2020-12-31T23:00:00.000+00:00", value: 100 },
        { ts: "2021-01-01T23:00:00.000+00:00", value: 101 },
      ],
    },
    {
      exerciseName: "Clean",
      exerciseMeasurement: "Kg",
      achievements: [
        { ts: "2020-12-31T23:00:00.000+00:00", value: 156 },
        { ts: "2021-01-01T23:00:00.000+00:00", value: 175 },
      ],
    },
    {
      exerciseName: "Burpees",
      exerciseMeasurement: "B/min",
      achievements: [
        { ts: "2020-12-31T23:00:00.000+00:00", value: 56 },
        { ts: "2021-01-01T23:00:00.000+00:00", value: 75 },
      ],
    },
  ],
};

describe("When data are correct", () => {
  it("Plot is available", () => {
    render(<AthleteAchievementsGraph {...defaultProps} />);
    expect(
      screen.queryByTestId("athlete-achievements-plot")
    ).toBeInTheDocument();
  });

  it("Legend is available", () => {
    render(<AthleteAchievementsGraph {...defaultProps} />);
    expect(screen.queryByTestId("legend")).toBeInTheDocument();
  });

  it("Legend Lines are available", () => {
    render(<AthleteAchievementsGraph {...defaultProps} />);
    expect(screen.getByText("Snatch(Kg)")).toBeInTheDocument();
    expect(screen.getByText("Clean(Kg)")).toBeInTheDocument();
    expect(screen.getByText("Burpees(B/min)")).toBeInTheDocument();
  });
});
