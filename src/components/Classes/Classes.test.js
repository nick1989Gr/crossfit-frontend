import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Classes from "./Classes";
import { useFetch } from "../../services/useFetch";

jest.mock("../../services/useFetch");

const MOCK_CLASSES = [
  {
    id: 1,
    className: "wod",
    description: "description for wod",
  },
  {
    id: 2,
    className: "weight lifting",
    description: "description for weight lifting",
  },
];

describe("classes tests", () => {
  describe("Still loading", () => {
    it("Loading component is visible", () => {
      useFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });
      render(<Classes />);
      expect(screen.queryByTestId("loading")).toBeInTheDocument();
    });

    it("Header is not visible", () => {
      useFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });
      render(<Classes />);
      expect(screen.queryByTestId("h1")).toBeNull();
    });
    it("Grid is not visible", () => {
      useFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });
      render(<Classes />);
      expect(screen.queryByTestId("class-grid")).toBeNull();
    });
  });

  describe("Loading completed", () => {
    it("Header is visible", () => {
      useFetch.mockReturnValue({
        data: MOCK_CLASSES,
        loading: false,
        error: null,
      });
      render(<Classes />);
      expect(screen.queryByTestId("h1")).toBeInTheDocument();
    });
    it("Grid is visible", () => {
      useFetch.mockReturnValue({
        data: MOCK_CLASSES,
        loading: false,
        error: null,
      });
      render(<Classes />);
      expect(screen.queryByTestId("class-grid")).toBeInTheDocument();
    });
    it("Loading component is not visible", () => {
      useFetch.mockReturnValue({
        data: MOCK_CLASSES,
        loading: false,
        error: null,
      });
      render(<Classes />);
      expect(screen.queryByTestId("loading")).toBeNull();
    });

    it("Classes info are correct", () => {
      useFetch.mockReturnValue({
        data: MOCK_CLASSES,
        loading: false,
        error: null,
      });
      render(<Classes />);
      MOCK_CLASSES.forEach((cls) => {
        expect(screen.getByText(cls.className)).toBeInTheDocument();
        expect(screen.getByText(cls.description)).toBeInTheDocument();
      });
    });
  });

  describe("Loading failed", () => {
    it("Exception was thrown", () => {
      useFetch.mockReturnValue({
        data: null,
        loading: false,
        error: true,
      });
      expect(() => {
        render(<Classes />);
      }).toThrowError();
    });
  });
});
