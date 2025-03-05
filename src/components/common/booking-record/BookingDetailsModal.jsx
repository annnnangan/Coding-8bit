import { useEffect, useRef, useState } from "react";

import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";

import AvatarWithFallback from "../AvatarWithFallback";
import BookingStatusBadge from "./BookingStatusBadge";
import ShowMoreBtn from "../ShowMoreButton";
import SectionFallback from "@/components/common/SectionFallback";

import bookingApi from "@/api/bookingApi";
import { formatDateDash, formatHour } from "@/utils/timeFormatted-utils";
import { serviceTypeMap } from "@/utils/schema/booking-schema";
import { determineMeetingLinkMessage } from "@/utils/booking-record-utils";

export default function BookingDetailsModal({ role, booking, isOpen, setOpenModal }) {
  const [loadingState, setLoadingState] = useState(false);
  const [submittingState, setSubmittingState] = useState(false);
  const [isOpenRescheduleModal, setOpenRescheduleModal] = useState(false);

  const [activeTab, setActiveTab] = useState("tutorNotes");

  const [editError, setEditError] = useState({ tutorNotes: "", studentComment: "" });
  const [tutorNotes, setTutorNotes] = useState("");
  const [isEditTutorNotes, setIsEditTutorNotes] = useState(false);
  const [hasStudentComment, setHasStudentComment] = useState();
  const [studentComment, setStudentComment] = useState({ student_comment: "", rating: "", comment_at: "" });
  const [isEditStudentComment, setIsEditStudentComment] = useState(false);

  // ReactQuill 文字編輯器
  const [tutorNotesInput, setTutorNotesInput] = useState("");
  const modules = {
    toolbar: [["bold", "italic", "underline"], ["link"], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["blockquote", "code-block"], ["clean"]],
  };

  /* ---------------------------------- Modal --------------------------------- */
  const bookingDetailsModal = useRef(null);
  const bookingDetailsModalRef = useRef(null);

  useEffect(() => {
    if (bookingDetailsModalRef.current) {
      if (bookingDetailsModal.current) {
        bookingDetailsModal.current.dispose(); // Destroy old modal instance
      }
      bookingDetailsModal.current = new bootstrap.Modal(bookingDetailsModalRef.current, { backdrop: "static" });
    }
  }, [bookingDetailsModalRef]);

  useEffect(() => {
    if (isOpen) {
      bookingDetailsModal.current.show();
    } else {
      bookingDetailsModal.current.hide();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (bookingDetailsModal.current) {
      setIsEditTutorNotes(false);
      setTutorNotes("");
      setStudentComment({ student_comment: "", rating: "", comment_at: "" });
      setHasStudentComment();
      setTutorNotesInput("");
      setEditError({ tutorNotes: "", studentComment: "" });
      bookingDetailsModal.current.hide();
      setOpenModal(false);
    }
  };

  /* ---------------------------------- Data from API --------------------------------- */

  const getTutorNotesAndStudentComment = async () => {
    setHasStudentComment();
    setTutorNotesInput("");
    setTutorNotes("");
    setStudentComment({ student_comment: "", rating: "", comment_at: "" });
    setLoadingState(true);
    try {
      const result = await bookingApi.getBooking(booking.id);
      setTutorNotesInput(result.tutor_notes);
      setTutorNotes(result.tutor_notes);
      console.log(result);
      if (result.student_comment || result.rating) {
        setHasStudentComment(true);
        setStudentComment({ student_comment: result.student_comment, rating: result.rating });
      }
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (booking.id) {
      getTutorNotesAndStudentComment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, booking.id]);

  /* ---------------------------------- Edit Tutor Notes / Student Comment --------------------------------- */

  const saveTutorNotes = async () => {
    if (role === "student") return;
    setSubmittingState(true);
    try {
      await bookingApi.saveTutorNotes(booking.id, tutorNotesInput);
      Swal.fire({
        icon: "success",
        title: "儲存成功",
      });
      getTutorNotesAndStudentComment();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "儲存失敗",
        text: error.response.data.message,
      });
    } finally {
      setSubmittingState(false);
    }
  };

  const handleEditTutorNotes = () => {
    if (isEditTutorNotes) {
      if (tutorNotesInput.length < 10) {
        setEditError({ ...editError, tutorNotes: "請填寫至少10個字。" });
        return;
      } else {
        saveTutorNotes();
        setEditError({ tutorNotes: "", studentComment: "" });
      }
    }
    setIsEditTutorNotes((prev) => !prev);
  };

  const handleRating = (rate) => {
    setStudentComment({ ...studentComment, rating: rate });
  };

  const handleEditStudentComment = () => {
    if (hasStudentComment) return;
    if (isEditStudentComment) {
      if (studentComment.student_comment.length < 5) {
        console.log(studentComment.student_comment.length);
        setEditError({ ...editError, studentComment: "請填寫至少5個字。" });
        return;
      } else if (!studentComment.rating) {
        console.log("hello");
        setEditError({ ...editError, studentComment: "請為是次預約評分。" });
        return;
      } else {
        saveStudentComment();
        setEditError({ tutorNotes: "", studentComment: "" });
      }
    }
    setIsEditStudentComment((prev) => !prev);
  };

  const saveStudentComment = async () => {
    if (role === "tutor") return;
    setSubmittingState(true);
    try {
      await bookingApi.saveStudentComment(booking.id, { ...studentComment, comment_at: new Date().toISOString() });

      Swal.fire({
        icon: "success",
        title: "儲存成功",
      });
      getTutorNotesAndStudentComment();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "儲存失敗",
        text: error.response.data.message,
      });
    } finally {
      setSubmittingState(false);
    }
  };

  return (
    <>
      <div id="bookingDetailsModal" className="modal" ref={bookingDetailsModalRef}>
        <div className="modal-dialog modal-dialog-centered modal-lg text text-break">
          <div className="modal-content border-0 shadow px-3 py-5">
            <div className="modal-header border-bottom-0">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <AvatarWithFallback
                  image={role === "tutor" ? booking.student_avatar : booking.tutor_avatar}
                  name={role === "tutor" ? booking.student_name : booking.tutor_name}
                  fontSize="fs-lg-4 fs-5"
                />
                <BookingStatusBadge status={booking.status} />
              </div>
              <button type="button" className="btn-close d-flex" aria-label="Close" onClick={handleCloseModal} style={{ marginTop: "-50px" }}></button>
            </div>

            <div className="modal-body">
              <ul className="d-flex flex-column align-items-start mb-3 gap-4">
                <li className="f-center gap-2">
                  <span className="material-symbols-outlined text-brand-03">calendar_today</span>
                  <p>{formatDateDash(booking.booking_date)}</p>
                </li>
                <li className="f-center gap-2">
                  <span className="material-symbols-outlined text-brand-03">schedule</span>
                  <p>{booking.timeslots.map((time) => `${formatHour(time)} - ${formatHour(time + 1)}`).join(" / ")}</p>
                </li>
                <li className="f-center gap-2">
                  <span className="material-symbols-outlined text-brand-03">link</span>
                  <p>{determineMeetingLinkMessage(booking.service_type, booking.status, booking.meeting_link)}</p>
                </li>

                <li className="f-center gap-2">
                  <span className="material-symbols-outlined text-brand-03">local_library</span>
                  <p>{serviceTypeMap[booking.service_type]}</p>
                </li>
                {booking.service_type === "codeReview" && (
                  <li>
                    <p className="fs-6 fs-md-5 fw-medium fw-md-bold mb-2">程式庫連結</p>
                    <p>{booking.source_code_url}</p>
                  </li>
                )}

                <li>
                  <p className="fs-6 fs-md-5 fw-medium fw-md-bold mb-2">希望接受指導的項目</p>
                  <ShowMoreBtn text={booking.instruction_details} maxCharacter={50} />
                </li>
              </ul>

              <ul className="nav nav-tabs mt-2 mb-4 border-bottom border-gray-03">
                <li className="nav-item cursor-pointer">
                  <p className={`nav-link${activeTab === "tutorNotes" ? " active rounded-top-3" : ""}`} onClick={() => setActiveTab("tutorNotes")}>
                    導師筆記
                  </p>
                </li>

                <li className="nav-item cursor-pointer">
                  <p className={`nav-link${activeTab === "studentComment" ? " active rounded-top-3" : ""}`} onClick={() => setActiveTab("studentComment")}>
                    學生評價
                  </p>
                </li>
              </ul>

              {activeTab === "tutorNotes" && (
                <div className="tutor-notes">
                  {role === "tutor" && (
                    <>
                      {!loadingState && (
                        <div className="d-flex justify-content-end gap-2">
                          <p className="d-inline-block d-flex justify-content-end fs-7 text-brand-03 fw-medium cursor-pointer mb-3" onClick={handleEditTutorNotes}>
                            {!submittingState && (isEditTutorNotes ? "儲存筆記" : "修改筆記")}
                          </p>

                          {!submittingState && isEditTutorNotes && (
                            <p
                              className="fs-7 text-brand-03 fw-medium cursor-pointer mb-3"
                              onClick={() => {
                                setIsEditTutorNotes(false);
                                setEditError({ tutorNotes: "", studentComment: "" });
                              }}
                            >
                              取消修改
                            </p>
                          )}
                        </div>
                      )}

                      {submittingState && (
                        <div className="d-flex justify-content-end">
                          <div className="spinner-border text-primary spinner-border-sm " role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {!isEditTutorNotes &&
                    !submittingState &&
                    (loadingState ? (
                      <p className="placeholder-glow">
                        <span className="placeholder bg-brand-01 col-8 rounded-2"></span>
                        <span className="placeholder bg-brand-01 col-8 rounded-2"></span>
                      </p>
                    ) : (
                      <div
                        className="text-break mt-3"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(tutorNotes),
                        }}
                      ></div>
                    ))}

                  {!isEditTutorNotes && !loadingState && !tutorNotes && (
                    <div>
                      <SectionFallback materialIconName="add_notes" fallbackText={`未有筆記`} />
                    </div>
                  )}

                  {isEditTutorNotes && role === "tutor" && (
                    <>
                      <ReactQuill value={tutorNotesInput} onChange={setTutorNotesInput} placeholder="輸入筆記" modules={modules} />
                      {editError.tutorNotes && <p className="text-danger fs-7 mt-2">{editError.tutorNotes}</p>}
                    </>
                  )}
                </div>
              )}

              {activeTab === "studentComment" && (
                <>
                  {booking.status !== "completed" && (
                    <div className="mt-10">
                      <SectionFallback materialIconName="cards_star" fallbackText={`完成預約後，學生才能評價`} />
                    </div>
                  )}

                  {booking.status === "completed" && (
                    <>
                      {loadingState && (
                        <p className="placeholder-glow">
                          <span className="placeholder bg-brand-01 col-8 rounded-2"></span>
                          <span className="placeholder bg-brand-01 col-8 rounded-2"></span>
                        </p>
                      )}

                      {!loadingState && hasStudentComment && (
                        <div>
                          <ReactStars count={5} value={studentComment.rating} size={30} activeColor="#d0a2f7" />
                          <p>{studentComment.student_comment}</p>
                        </div>
                      )}

                      {!loadingState && !hasStudentComment && !isEditStudentComment && booking.status === "completed" && role === "tutor" && (
                        <div className="mt-10">{<SectionFallback materialIconName="cards_star" fallbackText={`未有評論`} />}</div>
                      )}
                    </>
                  )}

                  {!loadingState && role === "student" && booking.status === "completed" && (
                    <>
                      {!hasStudentComment && (
                        <div className="d-flex justify-content-end gap-2">
                          <p className="d-inline-block d-flex justify-content-end fs-7 text-brand-03 fw-medium cursor-pointer mb-3" onClick={handleEditStudentComment}>
                            {!submittingState && (isEditStudentComment ? "儲存評論" : "新增評論")}
                          </p>

                          {!submittingState && isEditStudentComment && (
                            <p className="fs-7 text-brand-03 fw-medium cursor-pointer mb-3" onClick={() => setIsEditStudentComment(false)}>
                              取消評論
                            </p>
                          )}
                        </div>
                      )}

                      {!loadingState && !hasStudentComment && !isEditStudentComment && <div className="mt-10">{<SectionFallback materialIconName="cards_star" fallbackText={`未有評論`} />}</div>}

                      {!hasStudentComment && isEditStudentComment && (
                        <div>
                          <ReactStars count={5} onChange={handleRating} size={30} activeColor="#d0a2f7" />

                          <div className="my-3">
                            <label htmlFor="comment" className="form-label">
                              評論
                            </label>
                            <textarea
                              className={`form-control`}
                              id="comment"
                              rows="5"
                              placeholder="請輸入你對是次預約的評論。"
                              value={studentComment.student_comment}
                              onChange={(e) => setStudentComment({ ...studentComment, student_comment: e.target.value })}
                            ></textarea>
                            {editError.studentComment && <p className="text-danger fs-7 mt-2">{editError.studentComment}</p>}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer border-top-0 mt-3">
              <button
                className="col btn btn-outline-brand-03 fs-6 f-center gap-2"
                type="button"
                onClick={() => {
                  setOpenModal(false);
                  setOpenRescheduleModal(true);
                }}
              >
                <span className="material-symbols-outlined">edit_calendar</span> 改期
              </button>
              <button
                className="col btn btn-outline-brand-03 fs-6 f-center gap-2"
                type="button"
                onClick={() => {
                  setOpenModal(false);
                  setOpenRescheduleModal(false);
                }}
              >
                <span className="material-symbols-outlined">event_busy</span> 取消預約
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BookingDetailsModal.propTypes = {
  role: PropTypes.oneOf(["tutor", "student"]),
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student_name: PropTypes.string,
    student_avatar: PropTypes.string,
    tutor_name: PropTypes.string,
    tutor_avatar: PropTypes.string,
    status: PropTypes.oneOf(["in_progress", "completed", "cancelled"]).isRequired,
    booking_date: PropTypes.string.isRequired,
    timeslots: PropTypes.array.isRequired,
    service_type: PropTypes.string.isRequired,
    meeting_link: PropTypes.string,
    source_code_url: PropTypes.string,
    instruction_details: PropTypes.string.isRequired,
    tutor_notes: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func,
};
