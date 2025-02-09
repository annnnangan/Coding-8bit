import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";
import clsx from "clsx";
import { useIsMobile } from "../../hooks/use-mobile";

// Styled components
const Container = styled.nav`
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 312px;
  height: 100vh;
  background-color: ${(props) => (props.type === "student" ? "#ffffff" : "var(--bs-gray-01)")};
`;

const ListItem = styled.li`
  padding: 12px 20px;

  &.active {
    background-color: ${(props) => (props.type === "student" ? "var(--bs-brand-02)" : "#645CAA33")};
    border-radius: 16px;
  }

  &.active a {
    color: ${(props) => (props.type === "student" ? "var(--bs-brand-03)" : "#ffffff")};
  }

  &:hover a {
    color: ${(props) => (props.type === "student" ? "var(--bs-brand-03)" : "var(--bs-brand-01)")};
  }
`;

const Link = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: ${(props) => (props.type === "student" ? "var(--bs-gray-03)" : "var(--bs-gray-03)")};

  .icon-fill {
    margin-right: 4px;
  }
`;

const RightContentWrapper = styled.div`
  flex-grow: 1;
  padding: 36px;
  overflow-y: auto;
  height: 100vh;
`;

export default function BackendPanelMenu({ children, type, menuItems, user }) {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div type={type}>
        <nav className={`navbar fixed-top ${type === "student" ? "bg-white" : "bg-gray-01"}`}>
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img src="images/logo.svg" alt="logo-image" />
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas" aria-label="Toggle navigation">
              <span className={`material-symbols-outlined ${type === "student" ? "text-gray-01" : "text-white"}`} data-bs-dismiss="offcanvas" aria-label="Close">
                menu
              </span>
            </button>
            <div className={`offcanvas offcanvas-end ${type === "student" ? "bg-white" : "bg-gray-01"}`} tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
              <div className="offcanvas-header d-flex ms-auto mt-2">
                <span className={`material-symbols-outlined ${type === "student" ? "text-gray-01" : "text-white"}`} data-bs-dismiss="offcanvas" aria-label="Close">
                  close
                </span>
              </div>
              <div className="offcanvas-body d-flex flex-column px-3">
                <ul>
                  {menuItems.map((item) => (
                    <ListItem key={item.name} type={type} className={location.pathname === item.href ? "active" : ""}>
                      <Link to={item.href}>
                        <span className="material-symbols-outlined icon-fill">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ul>
                <div className="d-flex flex-row align-items-center mt-auto">
                  <div className="flex-shrink-0">
                    <img src={user.avatar} alt="profile" className="object-fit-cover rounded-circle me-4" style={{ height: "48px", width: "48px" }} />
                  </div>
                  <div>
                    <p className={clsx("fs-6", { "text-gray-01": type === "student", "text-white": type === "tutor" })}>{user.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div style={{ marginTop: "100px" }}>{children}</div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Container type={type}>
        <NavLink className="navbar-brand" to="/">
          <img src="images/logo.svg" alt="logo-image" className="mb-8" />
        </NavLink>
        <ul>
          {menuItems.map((item) => (
            <ListItem key={item.name} type={type} className={location.pathname === item.href ? "active" : ""}>
              <Link to={item.href}>
                <span className="material-symbols-outlined icon-fill">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </ListItem>
          ))}
        </ul>
        <div className="d-flex align-items-center mt-auto">
          <div className="flex-shrink-0">
            <img src={user.avatar} alt="profile" className="object-fit-cover rounded-circle me-4" style={{ height: "48px", width: "48px" }} />
          </div>
          <div className="flex-grow-1">
            <p className={clsx("fs-6", { "text-gray-01": type === "student", "text-white": type === "tutor" })}>{user.name}</p>
          </div>
        </div>
      </Container>

      {/* Right content with scrollable area */}
      <RightContentWrapper>{children}</RightContentWrapper>
    </div>
  );
}

// Define the shape of a menu item
const menuItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
});

// Define the shape of the user object
const userShape = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

BackendPanelMenu.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["tutor", "student"]).isRequired,
  menuItems: PropTypes.arrayOf(menuItemShape).isRequired,
  user: userShape.isRequired,
};
