import PropTypes from "prop-types";
import BackendPanelMenu from "../../components/layout/BackendPanelMenu";

export default function StudentPanelMenu({ children }) {
  return (
    <BackendPanelMenu menuItems={menuItems} type="student" user={user}>
      {children}
    </BackendPanelMenu>
  );
}

const menuItems = [
  {
    icon: "dashboard",
    name: "儀表板",
    href: "/student-panel/dashboard",
  },
  {
    icon: "event",
    name: "我的預約",
    href: "/student-panel/booking",
  },
  {
    icon: "auto_stories",
    name: "學習需求管理",
    href: "/student-panel/learning",
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

const user = {
  avatar: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "卡斯伯Casper",
};

StudentPanelMenu.propTypes = {
  children: PropTypes.node.isRequired,
};
