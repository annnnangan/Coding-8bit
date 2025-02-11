export const determineMeetingLinkMessage = (bookingType, bookingStatus, meetingLink) => {
  if (bookingType === "一對一教學" && bookingStatus === "in_progress" && meetingLink === null) {
    return "未釋出";
  }

  if (bookingType === "一對一教學" && bookingStatus === "completed") {
    return "已過期";
  }

  if (bookingType === "程式碼檢視" || (bookingType === "一對一教學" && bookingStatus === "canceled")) {
    return "不適用";
  }
};
