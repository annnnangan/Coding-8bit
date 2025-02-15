export const generateTimeslots = (type) => {
  if (type === "startTime") {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      return `${hour.toString().padStart(2, "0")}:00`;
    });
  }

  if (type === "endTime") {
    return Array.from({ length: 25 }, (_, i) => {
      const hour = i;
      return `${hour.toString().padStart(2, "0")}:00`;
    });
  }
};
