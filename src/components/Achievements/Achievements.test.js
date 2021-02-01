import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Achievements from "./Achievements";
import { EXERCISES as mockExercises } from "./AchievementsMisc";

let mockIsAuthenticated = true;

const mockAthleteAchievements = {
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
const mockSnatchData = {
  data: {
    exerciseName: "Snatch",
    exerciseMeasurement: "Kg",
    recordEntries: [
      { athleteName: "Ilieskou", record: 102 },
      { athleteName: "Black", record: 103.5 },
    ],
  },
};

const mockCleanData = {
  data: {
    exerciseName: "Clean",
    exerciseMeasurement: "Kg",
    recordEntries: [
      { athleteName: "Ilieskou", record: 120 },
      { athleteName: "Black", record: 185 },
    ],
  },
};

const mockBurpeesData = {
  data: {
    exerciseName: "Burpees",
    exerciseMeasurement: "B/min",
    recordEntries: [
      { athleteName: "Ilieskou", record: 90 },
      { athleteName: "Black", record: 85 },
    ],
  },
};

beforeEach(() => {
  mockIsAuthenticated = true;
});

jest.mock("../../api/achievementsApi", () => ({
  getTopAchievementsForExercise: (exId, at) => {
    if (exId === mockExercises.SNATCH) return Promise.resolve(mockSnatchData);
    else if (exId === mockExercises.CLEAN)
      return Promise.resolve(mockCleanData);
    else if (exId === mockExercises.BURPEES)
      return Promise.resolve(mockBurpeesData);
    else throw new Error({ response: { status: 400 } });
  },
  getAchievementsLogForAthlete: (athId, at) => {
    return Promise.resolve(mockAthleteAchievements);
  },
}));

jest.mock("../../utils/authenticationUtils", () => ({
  getToken: (_) => {
    return Promise.resolve("TOKEN");
  },
}));

jest.mock("../../api/athleteApi", () => ({
  getAthleteByEmail: (email, at) => {
    return Promise.resolve({ data: { id: 1 } });
  },
}));

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  useAuth0: () => ({
    user: { email: "user@user.com" },
    isAuthenticated: mockIsAuthenticated,
    getAccessTokenSilently: null,
  }),
}));

describe("Achievement tests", () => {
  describe("User is not authenticated", () => {
    it("LoginAlert is visible", async () => {
      mockIsAuthenticated = false;
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("login-alert")).toBeInTheDocument();
      });
    });

    it("Loading is not visible", async () => {
      mockIsAuthenticated = false;
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("loading")).toBeNull();
      });
    });

    it("Achievements are not visible", async () => {
      mockIsAuthenticated = false;
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("achievements")).toBeNull();
      });
    });
  });

  describe("Component is loading", () => {
    it("Login Alert is not visible", () => {
      render(<Achievements />);
      expect(screen.queryByTestId("login-alert")).toBeNull();
    });

    it("Achievements are not visible", () => {
      render(<Achievements />);
      expect(screen.queryByTestId("achievements")).toBeNull();
    });
  });

  describe("Loading finished succesfully", () => {
    it("Loading is not visible", async () => {
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("loading")).toBeNull();
      });
    });

    it("Login-alert is not visible", async () => {
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("login-alert")).toBeNull();
      });
    });

    it("Bar Graphs are present", async () => {
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.queryAllByTestId("bar-graph").length).toEqual(3);
      });
    });

    it("Bar Graphs headers are present", async () => {
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.getByText("Top Snatch athletes")).toBeInTheDocument();
        expect(screen.getByText("Top Clean athletes")).toBeInTheDocument();
        expect(screen.getByText("Top Burpees athletes")).toBeInTheDocument();
      });
    });

    it("Athlete achievements plot is present", async () => {
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(
          screen.queryByTestId("athlete-achievements-plot")
        ).toBeInTheDocument();
      });
    });

    it("Athlete achievements plot header is present", async () => {
      act(() => {
        render(<Achievements />);
      });
      await waitFor(() => {
        expect(screen.getByText("Athlete Achievements")).toBeInTheDocument();
      });
    });
  });
});
