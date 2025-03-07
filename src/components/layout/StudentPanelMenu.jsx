import PropTypes from "prop-types";
import BackendPanelMenu from "../../components/layout/BackendPanelMenu";

export default function StudentPanelMenu({ children }) {
  return (
    <BackendPanelMenu menuItems={menuItems} type="student">
      {children}
    </BackendPanelMenu>
  );
}

const menuItems = [
  {
    icon: "dashboard",
    name: "儀表板",
    href: "/student-panel",
  },
  {
    icon: "event",
    name: "我的預約",
    href: "/student-panel/booking",
  },
  {
    icon: "auto_stories",
    name: "學習需求管理",
    href: "/student-panel/custom-request",
  },
  {
    icon: "equalizer",
    name: "數據與趨勢",
    href: "/student-panel/statistics",
  },
  {
    icon: "notifications_active",
    name: "個人化通知",
    href: "/student-panel/notification",
  },
  {
    icon: "person",
    name: "個人資料管理",
    href: "/student-panel/profile",
  },
  {
    icon: "paid",
    name: "財務管理",
    href: "/student-panel/finance",
  },
];

StudentPanelMenu.propTypes = {
  children: PropTypes.node.isRequired,
};
