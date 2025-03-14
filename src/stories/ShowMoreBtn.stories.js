import ShowMoreBtn from "@/components/common/ShowMoreButton";

//Import your component and give the story a title
export default {
  title: "Show More Button",
  component: ShowMoreBtn,
};

//Define different case below
export const LongText = {
  args: {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, perspiciatis, dolore corrupti dolores obcaecati officia molestiae atque iusto animi doloremque saepe sit eveniet hic ex amet consectetur iste, ipsam minus.",
    maxCharacter: 20,
  },
};

export const ShortText = {
  args: {
    text: "Lorem  dolorminus.",
    maxCharacter: 20,
  },
};
