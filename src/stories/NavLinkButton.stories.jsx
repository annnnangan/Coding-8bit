import NavLinkButton from "@/components/common/NavLinkButton";
import { MemoryRouter } from "react-router-dom";

//Import your component and give the story a title
export default {
  title: "Buttons/Nav Link Button",
  component: NavLinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

//Define different case below
export const ButtonLinkType = {
  args: {
    type: "button",
    text: "馬上許願",
    href: "/add-learning-need",
  },
};
export const TextLinkType = {
  args: {
    type: "text",
    text: "查看更多",
    href: "/add-learning-need",
    withIcon: true,
  },
};

export const NoIcon = {
  args: {
    type: "text",
    text: "查看更多",
    href: "/add-learning-need",
    withIcon: false,
  },
};
