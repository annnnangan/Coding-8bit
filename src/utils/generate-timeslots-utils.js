export const generateTimeslots = (type) => {
  if (type === "startTime") {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      return hour;
    });
  }

  if (type === "endTime") {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i + 1;
      return hour;
    });
  }
};
