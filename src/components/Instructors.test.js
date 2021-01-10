import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Instructors from "./Instructors";
import { useAuthFetch } from "../services/useAuthFetch";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../services/useAuthFetch");

const MOCK_INSTRUCTORS = [
  {
    id: 1,
    firstName: "Joe",
    lastName: "Doe",
    email: "joeDoe@gmail.com",
    bio: "Joe Doe Bio",
  },
  {
    id: 2,
    firstName: "Joe2",
    lastName: "Doe2",
    email: "joeDoe2@gmail.com",
    bio: "Joe Doe 2 Bio",
  },
];

describe("Instructors tests", () => {
  describe("Authentication failed", () => {
    it("Login Alert is visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("login-alert")).toBeInTheDocument();
    });
    it("Loading is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("loading")).toBeNull();
    });
    it("Grid is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("instructors-grid")).toBeNull();
    });
  });

  describe("Still loading", () => {
    it("Loading component is visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("loading")).toBeInTheDocument();
    });

    it("Grid is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("instructors-grid")).toBeNull();
    });
    it("Login alert is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("login-alert")).toBeNull();
    });

    it("Loading component is visible", () => {
      useAuthFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("Loading completed", () => {
    it("Grid is visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_INSTRUCTORS,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("instructors-grid")).toBeInTheDocument();
    });
    it("Loading component is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_INSTRUCTORS,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("loading")).toBeNull();
    });

    it("Login Alert is not visible", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_INSTRUCTORS,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      expect(screen.queryByTestId("login-alert")).toBeNull();
    });

    it("Instructors info are correct", () => {
      useAuthFetch.mockReturnValue({
        data: MOCK_INSTRUCTORS,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
      render(<Instructors />);
      MOCK_INSTRUCTORS.forEach((i) => {
        expect(
          screen.getByText(i.firstName + " " + i.lastName)
        ).toBeInTheDocument();
        expect(screen.getByText(i.email)).toBeInTheDocument();
        expect(screen.getByText(i.bio)).toBeInTheDocument();
      });
    });

    describe("Loading failed", () => {
      it("Exception was thrown", () => {
        useAuthFetch.mockReturnValue({
          data: null,
          loading: false,
          error: true,
          isAuthenticated: true,
        });
        expect(() => {
          render(<Instructors />);
        }).toThrowError();
      });
    });
  });
});
