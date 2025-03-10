import PropTypes from "prop-types";
import BackendPanelMenu from "@/components/layout/BackendPanelMenu";

export default function TutorPanelMenu({ children }) {
  return (
    <BackendPanelMenu menuItems={menuItems} type="tutor">
      {children}
    </BackendPanelMenu>
  );
}

const menuItems = [
  {
    icon: "dashboard",
    name: "儀表板",
    href: "/tutor-panel",
  },
  {
    icon: "video_settings",
    name: "課程影片管理",
    href: "/tutor-panel/course",
  },
  {
    icon: "event",
    name: "預約管理",
    href: "/tutor-panel/booking",
  },
  {
    icon: "auto_stories",
    name: "學習需求管理",
    href: "/tutor-panel/learning",
  },
  {
    icon: "equalizer",
    name: "數據與趨勢",
    href: "/tutor-panel/statistics",
  },
  {
    icon: "notifications_active",
    name: "個人化通知",
    href: "/tutor-panel/notification",
  },
  {
    icon: "person",
    name: "個人資料管理",
    href: "/tutor-panel/profile",
  },
  {
    icon: "paid",
    name: "財務管理",
    href: "/tutor-panel/finance",
  },
];

TutorPanelMenu.propTypes = {
  children: PropTypes.node.isRequired,
};
