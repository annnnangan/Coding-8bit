import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import CommentCard from "@/components/tutor/CommentCard";
import CommentRatingStat from "./CommentRatingStat";
import SectionFallback from "@/components/common/SectionFallback";

import tutorApi from "@/api/tutorApi";

export default function CommentsSection({ modal = false, tutorId }) {
  const [isLoadingRatingStats, setLoadingRatingStatsState] = useState(false);
  const [isLoadingComment, setLoadingCommentState] = useState(false);
  const [ratingStats, setRatingStats] = useState({
    average_rating: 0,
    total_comment_count: 0,
    rating_distribute: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  });

  const [comments, setComments] = useState([]);

  const getRatingStats = async () => {
    setLoadingRatingStatsState(true);
    try {
      const result = await tutorApi.getTutorRatingStats(tutorId);
      setRatingStats(result);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingRatingStatsState(false);
    }
  };

  const getStudentComments = async (limit = 3, page = 1) => {
    setLoadingCommentState(true); // Show loading state before fetching data
    try {
      const result = await tutorApi.getTutorAllStudentComments({ tutorId, limit, page });
      setComments(result.data);
    } catch (error) {
      console.error("錯誤", error);
    } finally {
      setLoadingCommentState(false);
    }
  };

  useEffect(() => {
    getRatingStats();
    if (modal) {
      getStudentComments(5);
    } else {
      getStudentComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorId]);

  if (!modal) {
    return (
      <section className="section student-comment">
        <div className="section-component f-between-center">
          <h4>學生評價</h4>

          {!isLoadingComment && comments.length > 0 && (
            <a href="#" className="text-brand-03 d-flex slide-right-hover" data-bs-toggle="modal" data-bs-target="#studentCommentModal">
              <p>更多</p>
              <span className="material-symbols-outlined icon-fill">arrow_forward</span>
            </a>
          )}
        </div>

        <div className="row row-cols-lg-2 row-cols-1 g-lg-4 g-2">
          <div className="col">{isLoadingRatingStats ? <CommentRatingStat isLoading={true} /> : ratingStats.total_comment_count > 0 && <CommentRatingStat ratingStats={ratingStats} />}</div>
          {!isLoadingComment && comments.length === 0 && <SectionFallback materialIconName="reviews" fallbackText={`講師暫無學生評價`} />}
          {isLoadingComment && Array.from({ length: 3 }, (_, i) => <CommentCard key={i} isLoading={isLoadingComment} />)}
          {!isLoadingComment && comments.length > 0 && comments.map((comment) => <CommentCard comment={comment} key={comment.commentId} />)}
        </div>
      </section>
    );
  } else {
    return (
      <div className="modal fade student-comment-modal" id="studentCommentModal" tabIndex="-1" aria-labelledby="studentCommentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4 className="modal-title fs-md-2 fs-3 text-center mb-8" id="serviceSelectionModalLabel">
                學生評價
              </h4>
              <div className="row flex-column g-2">
                <div className="col">
                  <CommentRatingStat ratingStats={ratingStats} />
                </div>
                {isLoadingComment && Array.from({ length: 3 }, (_, i) => <CommentCard key={i} isLoading={isLoadingComment} />)}
                {!isLoadingComment && comments.map((comment) => <CommentCard comment={comment} key={comment.commentId} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CommentsSection.propTypes = {
  modal: PropTypes.bool,
  tutorId: PropTypes.string,
};
