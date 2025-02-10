import PropTypes from "prop-types";

export default function BookingStatusBadge({ status }) {
  return (
    <p className={`badge fs-7 f-center px-2 py-1 ${bookingStatusList[status].color} ${bookingStatusList[status].backgroundColor}`}>
      <span className="material-symbols-outlined fs-6 me-1">{bookingStatusList[status].icon}</span>
      {bookingStatusList[status].name}
    </p>
  );
}

// Define prop types
BookingStatusBadge.propTypes = {
  status: PropTypes.oneOf(["in_progress", "completed", "canceled"]).isRequired,
};

const bookingStatusList = {
  in_progress: {
    name: "未完成",
    color: "text-brand-03",
    icon: "hourglass_bottom",
    backgroundColor: "bg-brand-02",
  },
  completed: {
    name: "已完成",
    color: "text-success-01",
    icon: "check_circle",
    backgroundColor: "bg-success-02",
  },
  canceled: {
    name: "已取消",
    color: "text-gray-02",
    icon: "cancel",
    backgroundColor: "bg-gray-04",
  },
};
