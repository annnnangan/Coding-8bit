import BusinessHour from "./BusinessHour";

const daysOfWeekMap = [
  { value: "Monday", label: "星期一" },
  { value: "Tuesday", label: "星期二" },
  { value: "Wednesday", label: "星期三" },
  { value: "Thursday", label: "星期四" },
  { value: "Friday", label: "星期五" },
  { value: "Saturday", label: "星期六" },
  { value: "Sunday", label: "星期日" },
];

export default function AvailableTimeSection() {
  return (
    <div className="d-flex flex-column gap-5">
      {daysOfWeekMap.map((day) => {
        return <BusinessHour day={day} key={day.value} />;
      })}
    </div>
  );
}
