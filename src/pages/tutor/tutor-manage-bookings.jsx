import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import * as bootstrap from "bootstrap";

import Loader from "../../components/common/Loader";
import BackendPanelMenu from "../../components/layout/BackendPanelMenu";
import AllBookings from "../../components/tutor-panel/AllBookings";

const { VITE_API_BASE, VITE_API_BASE_2 } = import.meta.env;

export default function TutorManageBooking() {
  //loading
  const [loadingState, setLoadingState] = useState(true);
  const [activeTab, setActiveTab] = useState("allBookings");

  // 取得資料函式

  const getData = async () => {
    setLoadingState(false);
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getData();
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab based on clicked tab name
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 講師預約管理</title>
      </Helmet>
      {loadingState && <Loader />}
      <BackendPanelMenu menuItems={menuItems} type="tutor" user={user}>
        <div className="overflow-y-auto">
          <h2 className="mb-6 ps-5 ps-lg-0">預約管理</h2>
          <ul className="nav nav-tabs">
            <li className="nav-item cursor-pointer">
              <p className={`nav-link ${activeTab === "allBookings" ? "active bg-gray-04 rounded-top-3" : ""} border-bottom-0`} onClick={() => handleTabClick("allBookings")}>
                所有預約
              </p>
            </li>

            <li className="nav-item cursor-pointer">
              <p className={`nav-link ${activeTab === "availableTime" ? "active bg-gray-04 rounded-top-3" : ""} border-bottom-0`} onClick={() => handleTabClick("availableTime")}>
                設定可預約時間
              </p>
            </li>
          </ul>

          <div className="bg-gray-04 p-8 rounded-bottom-3 min-vh-100">{activeTab === "allBookings" && <AllBookings />}</div>
        </div>
      </BackendPanelMenu>
    </>
  );
}

const menuItems = [
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

const user = {
  avatar: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "卡斯伯Casper",
};
