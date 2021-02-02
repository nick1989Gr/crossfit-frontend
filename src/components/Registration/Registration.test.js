import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Registration from "./Registration";
import { formatDateVerbose, formatTime } from "../../utils/dateUtils";

let mockIsAuthenticated = true;
let mockRegistration = { classId: 0, athleteId: 0 };

const emptyClassProps = {
  classId: 1,
  userId: 35,
};

const fullClassProps = {
  classId: 2,
  userId: 35,
};

const athRegisteredProps = {
  classId: 3,
  userId: 35,
};

const mockAthleteRegistered = {
  data: {
    id: athRegisteredProps.classId,
    type: "wod",
    ts: "2021-01-01T15:00:00.000+00:00",
    classDuration: 60,
    maxParticipants: 5,
    instructors: [
      {
        id: 1,
        firstName: "Tim",
        lastName: "Madeson",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        email: "timmadeson@gmail.com",
        phoneNumber: "+31622855789",
        bio: "Crossfit Trainer with specialization in WODs",
      },
    ],
    athletes: [
      {
        id: athRegisteredProps.userId,
        firstName: "Nick",
        lastName: "Ilieskou",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        enrolledDate: "2018-12-31T23:00:00.000+00:00",
        email: "nickilieskou@gmail.com",
        phoneNumber: "+31622855789",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Black",
        dateOfBirth: "1988-04-10T22:00:00.000+00:00",
        enrolledDate: "2019-12-31T23:00:00.000+00:00",
        email: "johnBlack@gmail.com",
        phoneNumber: "+31622855789",
      },
      {
        id: 3,
        firstName: "Jim",
        lastName: "White",
        dateOfBirth: "1986-04-10T22:00:00.000+00:00",
        enrolledDate: "2014-12-31T23:00:00.000+00:00",
        email: "jimwhite@gmail.com",
        phoneNumber: "+31622855789",
      },
    ],
  },
};

const mockFullClass = {
  data: {
    id: fullClassProps.classId,
    type: "wod",
    ts: "2021-01-01T15:00:00.000+00:00",
    classDuration: 60,
    maxParticipants: 5,
    instructors: [
      {
        id: 1,
        firstName: "Tim",
        lastName: "Madeson",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        email: "timmadeson@gmail.com",
        phoneNumber: "+31622855789",
        bio: "Crossfit Trainer with specialization in WODs",
      },
    ],
    athletes: [
      {
        id: 1,
        firstName: "Nick",
        lastName: "Ilieskou",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        enrolledDate: "2018-12-31T23:00:00.000+00:00",
        email: "nickilieskou@gmail.com",
        phoneNumber: "+31622855789",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Black",
        dateOfBirth: "1988-04-10T22:00:00.000+00:00",
        enrolledDate: "2019-12-31T23:00:00.000+00:00",
        email: "johnBlack@gmail.com",
        phoneNumber: "+31622855789",
      },
      {
        id: 3,
        firstName: "Jim",
        lastName: "White",
        dateOfBirth: "1986-04-10T22:00:00.000+00:00",
        enrolledDate: "2014-12-31T23:00:00.000+00:00",
        email: "jimwhite@gmail.com",
        phoneNumber: "+31622855789",
      },
      {
        id: 4,
        firstName: "Aad",
        lastName: "Stones",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        enrolledDate: "2013-12-31T23:00:00.000+00:00",
        email: "AadStones@gmail.com",
        phoneNumber: "+31622855789",
      },
      {
        id: 5,
        firstName: "Rick",
        lastName: "Kerling",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        enrolledDate: "2015-12-31T23:00:00.000+00:00",
        email: "rickkerling@gmail.com",
        phoneNumber: "+31622855789",
      },
    ],
  },
};

const mockEmptyClassInfo = {
  data: {
    id: emptyClassProps.classId,
    type: "wod",
    ts: "2021-01-08T14:00:00.000+00:00",
    classDuration: 60,
    maxParticipants: 5,
    instructors: [
      {
        id: 1,
        firstName: "Tim",
        lastName: "Madeson",
        dateOfBirth: "1989-04-10T22:00:00.000+00:00",
        email: "timmadeson@gmail.com",
        phoneNumber: "+31622855789",
        bio: "Crossfit Trainer with specialization in WODs",
      },
    ],
    athletes: [],
  },
};

jest.mock("../../utils/authenticationUtils", () => ({
  getToken: (_) => {
    return Promise.resolve("TOKEN");
  },
}));

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  useAuth0: () => {
    return {
      isAuthenticated: mockIsAuthenticated,
      getAccessTokenSilently: null,
    };
  },
}));

jest.mock("../../api/crossfitClassesApi", () => ({
  getAnalyticalClassInfo: (id, at) => {
    if (id === mockEmptyClassInfo.data.id)
      return Promise.resolve(mockEmptyClassInfo);
    if (id === mockFullClass.data.id) return Promise.resolve(mockFullClass);
    if (id === mockAthleteRegistered.data.id)
      return Promise.resolve(mockAthleteRegistered);
  },
  registerAthleteToClass: (athleteId, classId, at) => {
    mockRegistration.athleteId = athleteId;
    mockRegistration.classId = classId;
    return Promise.resolve();
  },
  unregisterAthleteToClass: (athleteId, classId, at) => {
    mockRegistration.athleteId = athleteId;
    mockRegistration.classId = classId;
    return Promise.resolve();
  },
}));

afterEach(cleanup);
beforeEach(() => {
  mockIsAuthenticated = true;
  mockRegistration = { classId: 0, athleteId: 0 };
});

describe("Registration tests ", () => {
  describe("User is not authenticated", () => {
    it("LoginAlert is visible", async () => {
      mockIsAuthenticated = false;
      act(() => {
        render(<Registration {...emptyClassProps} />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("login-alert")).toBeInTheDocument();
      });
    });

    it("Loading is not visible", async () => {
      mockIsAuthenticated = false;
      act(() => {
        render(<Registration {...emptyClassProps} />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("loading")).toBeNull();
      });
    });

    it("Registration is not visible", async () => {
      mockIsAuthenticated = false;
      act(() => {
        render(<Registration {...emptyClassProps} />);
      });
      await waitFor(() => {
        expect(screen.queryByTestId("registration")).toBeNull();
      });
    });
  });

  describe("Load was successful", () => {
    describe("Full class", () => {
      it("Registration is available", async () => {
        act(() => {
          render(<Registration {...fullClassProps} />);
        });
        await waitFor(() => {
          expect(screen.queryByTestId("registration")).toBeInTheDocument();
        });
      });
      it("Header is available", async () => {
        act(() => {
          render(<Registration {...fullClassProps} />);
        });
        await waitFor(() => {
          expect(
            screen.getByText(
              mockFullClass.data.type +
                " | " +
                formatDateVerbose(new Date(mockFullClass.data.ts)) +
                " | " +
                formatTime(new Date(mockFullClass.data.ts))
            )
          ).toBeInTheDocument();
        });
      });
      it("Alert about class being full is present", async () => {
        act(() => {
          render(<Registration {...fullClassProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Class is Full")).toBeInTheDocument();
        });
      });

      it("No button is present for registering or unregistering", async () => {
        act(() => {
          render(<Registration {...fullClassProps} />);
        });
        await waitFor(() => {
          expect(screen.queryByText("Register")).toBeNull();
          expect(screen.queryByText("Unregister")).toBeNull();
        });
      });

      it("Instructor(s) is present", async () => {
        act(() => {
          render(<Registration {...fullClassProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Instructor(s)")).toBeInTheDocument();
          expect(
            screen.getByText(
              mockFullClass.data.instructors[0].firstName +
                " " +
                mockFullClass.data.instructors[0].lastName
            )
          ).toBeInTheDocument();
          expect(
            screen.getByText(mockFullClass.data.instructors[0].email)
          ).toBeInTheDocument();
          expect(
            screen.getByText(mockFullClass.data.instructors[0].bio)
          ).toBeInTheDocument();
        });
      });
      it("Athlete list is present", async () => {
        act(() => {
          render(<Registration {...fullClassProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Enrolled Athletes")).toBeInTheDocument();
          mockFullClass.data.athletes.forEach((a) => {
            expect(
              screen.getByText(a.firstName + " " + a.lastName)
            ).toBeInTheDocument();
            expect(screen.getByText(a.email)).toBeInTheDocument();
          });
        });
      });
    });

    describe("Empty class", () => {
      it("Registration is available", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });
        await waitFor(() => {
          expect(screen.queryByTestId("registration")).toBeInTheDocument();
        });
      });

      it("Header is available", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });
        await waitFor(() => {
          expect(
            screen.getByText(
              mockEmptyClassInfo.data.type +
                " | " +
                formatDateVerbose(new Date(mockEmptyClassInfo.data.ts)) +
                " | " +
                formatTime(new Date(mockEmptyClassInfo.data.ts))
            )
          ).toBeInTheDocument();
        });
      });

      it("Warning about available slots is present", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });
        await waitFor(() => {
          expect(
            screen.getByText(
              mockEmptyClassInfo.data.maxParticipants + " available slots"
            )
          ).toBeInTheDocument();
        });
      });

      it("Register button is present", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Register")).toBeInTheDocument();
          expect(screen.queryByText("Unregister")).toBeNull();
        });
      });

      it("Athlete can register", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });

        await waitFor(() => {
          const button = screen.getByTestId("register-button");
          fireEvent.click(button);
          expect(mockRegistration.athleteId).toBe(emptyClassProps.userId);
          expect(mockRegistration.classId).toBe(emptyClassProps.classId);
        });
      });

      it("Instructor(s) is present", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Instructor(s)")).toBeInTheDocument();
          expect(
            screen.getByText(
              mockEmptyClassInfo.data.instructors[0].firstName +
                " " +
                mockEmptyClassInfo.data.instructors[0].lastName
            )
          ).toBeInTheDocument();
          expect(
            screen.getByText(mockEmptyClassInfo.data.instructors[0].email)
          ).toBeInTheDocument();
          expect(
            screen.getByText(mockEmptyClassInfo.data.instructors[0].bio)
          ).toBeInTheDocument();
        });
      });

      it("Athletes list is empty", async () => {
        act(() => {
          render(<Registration {...emptyClassProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Enrolled Athletes")).toBeInTheDocument();
          expect(screen.getByText("Class is empty.")).toBeInTheDocument();
        });
      });
    });

    describe("Athlete is already registered in the class", () => {
      it("Registration is available", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });
        await waitFor(() => {
          expect(screen.queryByTestId("registration")).toBeInTheDocument();
        });
      });
      it("Header is available", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });

        await waitFor(() => {
          expect(
            screen.getByText(
              mockAthleteRegistered.data.type +
                " | " +
                formatDateVerbose(new Date(mockAthleteRegistered.data.ts)) +
                " | " +
                formatTime(new Date(mockAthleteRegistered.data.ts))
            )
          ).toBeInTheDocument();
        });
      });
      it("Warning athlete is registered is available", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });
        await waitFor(() => {
          expect(
            screen.getByText("You are enrolled for this class")
          ).toBeInTheDocument();
        });
      });
      it("Unregister button is presnet", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Unregister")).toBeInTheDocument();
          expect(screen.queryByText("Register")).toBeNull();
        });
      });
      it("Athlete can unregister", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });

        await waitFor(() => {
          const button = screen.getByTestId("unregister-button");
          fireEvent.click(button);
          expect(mockRegistration.athleteId).toBe(athRegisteredProps.userId);
          expect(mockRegistration.classId).toBe(athRegisteredProps.classId);
        });
      });
      it("Instructor(s) is present", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Instructor(s)")).toBeInTheDocument();
          expect(
            screen.getByText(
              mockAthleteRegistered.data.instructors[0].firstName +
                " " +
                mockAthleteRegistered.data.instructors[0].lastName
            )
          ).toBeInTheDocument();
          expect(
            screen.getByText(mockAthleteRegistered.data.instructors[0].email)
          ).toBeInTheDocument();
          expect(
            screen.getByText(mockAthleteRegistered.data.instructors[0].bio)
          ).toBeInTheDocument();
        });
      });
      it("Athlete list is present", async () => {
        act(() => {
          render(<Registration {...athRegisteredProps} />);
        });
        await waitFor(() => {
          expect(screen.getByText("Enrolled Athletes")).toBeInTheDocument();
          mockAthleteRegistered.data.athletes.forEach((a) => {
            expect(
              screen.getByText(a.firstName + " " + a.lastName)
            ).toBeInTheDocument();
            expect(screen.getByText(a.email)).toBeInTheDocument();
          });
        });
      });
    });
  });
});
