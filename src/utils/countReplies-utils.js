// 統計留言的回覆數
export const countReplies = (comments) => {

  const replyCountMap = comments.reduce((acc, comment) => {
    if (comment.parent_id) {
      if (!acc[comment.parent_id]) {
        acc[comment.parent_id] = [];
      }
      acc[comment.parent_id].push(comment);
    }
    return acc;
  }, {});

  return replyCountMap;
};
