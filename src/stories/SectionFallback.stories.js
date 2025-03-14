import SectionFallback from "@/components/common/SectionFallback";

//Import your component and give the story a title
export default {
  title: "Section Fallback",
  component: SectionFallback,
  parameters: {
    layout: "centered",
  },
};

//Define different case below
export const Normal = {
  args: {
    materialIconName: "event_busy",
    fallbackText: "導師暫無可預約時間",
  },
};
