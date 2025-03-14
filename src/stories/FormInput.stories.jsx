import FormInput from "@/components/common/FormInput";
import styled from "styled-components";

const RelativeWrapper = styled.div`
  position: relative;
`;
// Import your component and give the story a title
export default {
  title: "Form/Form Input",
  component: FormInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <RelativeWrapper>
          <Story />
        </RelativeWrapper>
      );
    },
  ],
};

export const Normal = {
  args: {
    id: "title",
    labelText: "學習需求標題",
    type: "text",
    errors: "",
    register: () => {},
  },
};

export const NormalError = {
  args: {
    id: "title",
    labelText: "學習需求標題",
    type: "text",
    errors: { title: { message: "請輸入學習需求標題" } },
    register: () => {},
  },
};

export const Underline = {
  args: {
    style: "underline",
    inputIcon: "mail",
    id: "email",
    labelText: "電子信箱",
    type: "email",
    errors: "",
    register: () => {},
  },
};

export const UnderlineError = {
  args: {
    style: "underline",
    inputIcon: "mail",
    id: "email",
    labelText: "電子信箱",
    type: "email",
    errors: { email: { message: "請輸入有效的 Email" } },
    register: () => {},
  },
};

export const PayInput = {
  args: {
    style: "payInput",
    id: "buyerName",
    labelText: "姓名",
    type: "text",
    errors: "",
    register: () => {},
  },
};

export const PayInputError = {
  args: {
    style: "payInput",
    id: "buyerName",
    labelText: "姓名",
    type: "text",
    errors: { buyerName: { message: "姓名為必填" } },
    register: () => {},
  },
};

//  <FormInput style="payInput" register={register} errors={errors} id="buyerName" labelText="姓名" type="text" />
