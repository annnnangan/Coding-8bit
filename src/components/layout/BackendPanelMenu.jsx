import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

// Styled components
const Container = styled.div`
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

const Link = styled.a`
  display: flex;
  text-decoration: none;
  color: ${(props) => (props.type === "student" ? "var(--bs-gray-03)" : "var(--bs-gray-03)")};

  .icon-fill {
    margin-right: 4px;
  }
`;

export default function BackendPanelMenu({ children, type, menuItems, user }) {
  const location = useLocation();
  return (
    <Container type={type}>
      <img src="images/logo.svg" alt="logo-image" className="mb-8" />
      <ul>
        {menuItems.map((item) => (
          <ListItem key={item.name} type={type} className={location.pathname === item.href ? "active" : ""}>
            <Link href={item.href}>
              <span className="material-symbols-outlined icon-fill">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </ListItem>
        ))}
      </ul>
      {children}
      <div className="d-flex align-items-center mt-auto">
        <div className="flex-shrink-0">
          <img src={user.avatar} alt="profile" className="object-fit-cover rounded-circle me-4" style={{ height: "48px", width: "48px" }} />
        </div>
        <div className="flex-grow-1">
          <p
            // className="fs-6 text-white"
            className={clsx("fs-6", { "text-gray-01": type === "student", "text-white": type === "tutor" })}
          >
            {user.name}
          </p>
        </div>
      </div>
    </Container>
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
