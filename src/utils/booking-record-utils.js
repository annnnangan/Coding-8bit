export const determineMeetingLinkMessage = (bookingType, bookingStatus, meetingLink) => {
  if (bookingType === "courseSession" && bookingStatus === "in_progress" && meetingLink === null) {
    return "未釋出";
  }

  if (bookingType === "courseSession" && bookingStatus === "completed") {
    return "已過期";
  }

  if (bookingType === "codeReview" || (bookingType === "courseSession" && bookingStatus === "cancelled")) {
    return "不適用";
  }
};
