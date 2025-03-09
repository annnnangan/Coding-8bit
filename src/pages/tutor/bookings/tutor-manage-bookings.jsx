import { useState } from "react";
import { Helmet } from "react-helmet-async";

import AllBookingsSection from "@/components/tutor-panel/booking/all-bookings/AllBookingsSection";
import AvailableTimeSection from "@/components/tutor-panel/booking/available-time/AvailableTimeSection";
import HourlyRateSection from "@/components/tutor-panel/booking/HourlyRateSection";

export default function TutorManageBooking() {
  const [activeTab, setActiveTab] = useState("allBookings");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab based on clicked tab name
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 講師預約管理</title>
      </Helmet>

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

          <li className="nav-item cursor-pointer">
            <p className={`nav-link ${activeTab === "hourlyRate" ? "active bg-gray-04 rounded-top-3" : ""} border-bottom-0`} onClick={() => handleTabClick("hourlyRate")}>
              設定預約費用
            </p>
          </li>
        </ul>

        <div className="bg-gray-04 p-8 rounded-bottom-3 tutor-manage-booking-section">
          {activeTab === "allBookings" && <AllBookingsSection role="tutor" />}
          {activeTab === "availableTime" && <AvailableTimeSection />}
          {activeTab === "hourlyRate" && <HourlyRateSection />}
        </div>
      </div>
    </>
  );
}
