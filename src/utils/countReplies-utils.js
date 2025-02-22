// 統計留言的回覆數
export const countReplies = (comments) => {
  console.log(comments);
  
  const replyCountMap = comments.reduce((acc, comment) => {
    if (comment.parent_id) {
      acc[comment.parent_id] = (acc[comment.parent_id] || 0) + 1;
    }
    return acc;
  }, {});
  console.log(replyCountMap);
  
  return replyCountMap;
};

