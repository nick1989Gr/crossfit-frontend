import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AthletesTable from "./AthletesTable";
import { useAuthFetch } from "../../services/useAuthFetch";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../services/useAuthFetch");

const MOCK_ATHLETES = [
  {
    id: 1,
    firstName: "Joe",
    lastName: "Doe",
    dateOfBirth: "1989-01-10T14:19:18.886Z",
    enrolledDate: "2021-01-10T14:19:18.886Z",
    phoneNumber: "5555",
    email: "joedoe@gmail.com",
  },
];

describe("AthletesTable tests", () => {
  describe("Not authenticated", () => {
    it("Table is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("table-container")).toBeNull();
    });

    it("Login alert is visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("login-alert")).toBeInTheDocument();
    });
  });

  describe("Authenticated but still loading", () => {
    it("Table is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("table-container")).toBeNull();
    });

    it("Login alert is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("login-alert")).toBeNull();
    });

    it("Loading is visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("Loading failed", () => {
    it("Exception thrown", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: false,
        error: { status: 401 },
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("error-handler")).toBeInTheDocument();
    });
  });

  describe("Loading finished succesfully", () => {
    it("LoginAlert is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_ATHLETES,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("login-alert")).toBeNull();
    });

    it("Loading  is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_ATHLETES,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("loading")).toBeNull();
    });

    it("Error Handler  is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_ATHLETES,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("error-handler")).toBeNull();
    });

    it("Table container is visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_ATHLETES,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.queryByTestId("table-container")).toBeInTheDocument();
    });

    it("Athlete data are visible visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_ATHLETES,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<AthletesTable />);
      expect(screen.getByText(MOCK_ATHLETES[0].firstName)).toBeInTheDocument();
      expect(screen.getByText(MOCK_ATHLETES[0].lastName)).toBeInTheDocument();
      expect(
        screen.getByText(new Date(MOCK_ATHLETES[0].dateOfBirth).toDateString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(new Date(MOCK_ATHLETES[0].enrolledDate).toDateString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(MOCK_ATHLETES[0].phoneNumber)
      ).toBeInTheDocument();
      expect(screen.getByText(MOCK_ATHLETES[0].email)).toBeInTheDocument();
    });
  });
});
