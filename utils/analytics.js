import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("G-GGZG06ZVRT");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
