import Aos, { AOS } from "aos";
import "aos/dist/aos.css";

export default {
  install: (app) => {
    Aos.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  },
};
