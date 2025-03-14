import FormSubmitButton from "@/components/common/FormSubmitButton";
import { fn } from "@storybook/test";

//Import your component and give the story a title
export default {
  title: "Form/Form Submit Button",
  component: FormSubmitButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
};

export const Normal = {
  args: {
    isLoading: false,
    buttonText: "前往付款",
    loadingText: "處理中",
  },
};

export const Loading = {
  args: {
    isLoading: true,
    buttonText: "前往付款",
    loadingText: "處理中",
  },
};

export const WithIcon = {
  args: {
    isLoading: false,
    withIcon: true,
    buttonText: "前往付款",
    loadingText: "處理中",
  },
};

export const WithIconAndAnimation = {
  args: {
    isLoading: false,
    withIcon: true,
    withSlideRightAnimation: true,
    buttonText: "前往付款",
    loadingText: "處理中",
  },
};
