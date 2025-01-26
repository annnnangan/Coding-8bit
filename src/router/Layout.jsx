import PropTypes from "prop-types";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import ScrollToTopBtn from "../components/layout/ScrollToTopBtn";
import ScrollToTop from "../components/layout/ScrollToTop";

export default function Layout({ children, showHeaderFooter, showToTopBtn }) {
  return (
    <>
      <ScrollToTop />
      {showHeaderFooter && <Header />}
      {children}
      {showToTopBtn && <ScrollToTopBtn />}
      {showHeaderFooter && <Footer />}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHeaderFooter: PropTypes.bool,
  showToTopBtn: PropTypes.bool,
};
