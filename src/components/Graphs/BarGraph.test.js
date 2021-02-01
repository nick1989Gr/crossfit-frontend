import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BarGraph from "./BarGraph";

const defaultProps = {
  data: {
    exerciseName: "Snatch",
    exerciseMeasurement: "Kg",
    recordEntries: [
      { athleteName: "Ilieskou", record: 102 },
      { athleteName: "Black", record: 103.5 },
    ],
  },
  color: "#08CA1B",
};

describe("When data are correct", () => {
  it("Bar Graph is available", () => {
    render(<BarGraph {...defaultProps} />);
    expect(screen.queryByTestId("bar-graph")).toBeInTheDocument();
  });

  it("Athletes names are available", () => {
    render(<BarGraph {...defaultProps} />);
    expect(screen.getByText("Ilieskou")).toBeInTheDocument();
    expect(screen.getByText("Black")).toBeInTheDocument();
  });

  it("Y axis name is available", () => {
    render(<BarGraph {...defaultProps} />);
    expect(screen.getByText("Snatch(Kg)")).toBeInTheDocument();
  });
});
