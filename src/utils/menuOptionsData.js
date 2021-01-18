import athletesPic from "../resources/images/athletes.PNG";
import instructorPic from "../resources/images/instructor.jpg";
import classesPic from "../resources/images/classes.PNG";
import schedulePic from "../resources/images/schedule.PNG";
import achievementsPic from "../resources/images/achievements.PNG";
import profilePic from "../resources/images/profile.PNG";
import registerPic from "../resources/images/register.PNG";

const athletes = {
  img: athletesPic,
  title: "Athletes",
  subtitle: "Explore our athletes",
  path: "/athletes",
};

const instructors = {
  img: instructorPic,
  title: "Instructors",
  subtitle: "Explore our instructors",
  path: "/instructors",
};

const classes = {
  img: classesPic,
  title: "Classes",
  subtitle: "Explore our classes",
  path: "/classes",
};

const schedule = {
  img: schedulePic,
  title: "Schedule",
  subtitle: "Book your class",
  path: "/schedule",
};

const achievements = {
  img: achievementsPic,
  title: "Achievements",
  subtitle: "Log and view your achievements",
  path: "/achievements",
};

const menuProfile = {
  img: profilePic,
  title: "Profile",
  subtitle: "look at your profile",
  path: "/profile",
};

const registerAthlete = {
  img: registerPic,
  title: "Register",
  subtitle: "Register as an athlete",
  path: "/new_athlete",
};

export const menuItemsNoLogin = [instructors, classes];

export const menuItemsForAthlete = [
  athletes,
  instructors,
  classes,
  schedule,
  achievements,
  menuProfile,
];

export const menuItemsForNewUser = [
  athletes,
  instructors,
  classes,
  achievements,
  registerAthlete,
];
