import CommentCard from "@/components/tutor/CommentCard";

//Import your component and give the story a title
export default {
  title: "Comment Card",
  component: CommentCard,
  parameters: {
    layout: "centered",
  },
};

//Define different case below
export const Normal = {
  args: {
    isLoading: false,
    comment: {
      username: "陳大明",
      avatar_url: "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      comment: "很好的導師",
      comment_at: "2025-03-06 21:58:57.366 +0800",
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      );
    },
  ],
};
export const Loading = {
  args: {
    isLoading: true,
    comment: {
      username: "陳大明",
      avatar_url: "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      comment: "很好的導師",
      comment_at: "2025-03-06 21:58:57.366 +0800",
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      );
    },
  ],
};

const comments = [
  {
    username: "陳大明",
    avatar_url: "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D",
    comment: "很好的導師",
    comment_at: "2025-03-06 21:58:57.366 +0800",
  },
  {
    username: "李小明",
    avatar_url: "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=1432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    comment: "非常專業的教學",
    comment_at: "2025-03-07 12:45:00.000 +0800",
  },
  {
    username: "王小華",
    avatar_url: "https://images.unsplash.com/photo-1592188657297-c6473609e988?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    comment: "解決了我的問題，感謝!",
    comment_at: "2025-03-08 14:32:21.000 +0800",
  },
  {
    username: "小小",
    avatar_url: "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    comment: "導師很有耐心!",
    comment_at: "2025-03-01 14:32:21.000 +0800",
  },
];

export const MultipleVerticalComments = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {comments.map((comment, index) => (
        <CommentCard key={index} isLoading={false} comment={comment} />
      ))}
    </div>
  ),
};

export const MultipleHorizontalComments = {
  render: () => (
    <div className="row row-cols-lg-2 row-cols-1 g-lg-4 g-2">
      {comments.map((comment, index) => (
        <CommentCard key={index} isLoading={false} comment={comment} />
      ))}
    </div>
  ),
};
