import { Helmet } from "react-helmet-async";

import AllBookingsSection from "@/components/tutor-panel/booking/all-bookings/AllBookingsSection";

export default function StudentManageBooking() {
  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 學生我的預約</title>
      </Helmet>

      <div className="overflow-y-auto">
        <h2 className="mb-6 ps-5 ps-lg-0">我的預約</h2>

        <div className="bg-gray-04 p-8 rounded-3 student-manage-booking-section">
          <AllBookingsSection role={"student"} />
        </div>
      </div>
    </>
  );
}
