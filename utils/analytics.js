import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("G-CG40JMF91G");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
