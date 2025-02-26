// 統計留言的回覆數
export const countReplies = (comments) => {

  const replyCountMap = comments.reduce((acc, comment) => {
    if (comment.parent_id) {
      if (!acc[comment.parent_id]) {
        acc[comment.parent_id] = [];
      }
      acc[comment.parent_id].unshift(comment);
    }
    return acc;
  }, {});

  return replyCountMap;
};


// 區分留言有否有 parent_id
export const reduceComments = (data) => {
  const { parentComments, childComments } = data.reduce(
    (acc, comment) => {
      if (comment.parent_id === null) {
        acc.parentComments.push(comment);
      } else {
        acc.childComments.push(comment);
      }
      return acc;
    },
    { parentComments: [], childComments: [] }
  );
  return { parentComments, childComments };
};
