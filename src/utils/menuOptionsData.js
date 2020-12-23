import athletes from "../resources/images/athletes.PNG";
import instructor from "../resources/images/instructor.jpg";
import classes from "../resources/images/classes.PNG";
import schedule from "../resources/images/schedule.PNG";
import achievements from "../resources/images/achievements.PNG";

export const menuOptionsData = [
  {
    img: athletes,
    title: "Athletes",
    subtitle: "Explore our athletes",
    path: "/athletes",
  },
  {
    img: instructor,
    title: "Instructors",
    subtitle: "Explore our instructors",
    path: "/instructors",
  },
  {
    img: classes,
    title: "Classes",
    subtitle: "Explore our classes",
    path: "/classes",
  },
  {
    img: achievements,
    title: "Achievements",
    subtitle: "Log and view your achievements",
    path: "/achievements",
  },
  {
    img: schedule,
    title: "Schedule",
    subtitle: "Book your class",
    path: "/schedule",
  },
];
