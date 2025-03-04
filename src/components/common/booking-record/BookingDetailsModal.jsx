import { useEffect, useRef, useState } from "react";

import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

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

  const [tutorNotes, setTutorNotes] = useState("");
  const [isEditTutorNotes, setIsEditTutorNotes] = useState(false);
  const [studentComment, setStudentComment] = useState({ comment: "", rating: "" });
  const [editError, setEditError] = useState("");

  // ReactQuill 文字編輯器
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [[{ font: [] }], ["bold", "italic", "underline"], ["link"], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["blockquote", "code-block"], ["clean"]],
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
    setIsEditTutorNotes(false);
    setTutorNotes("");
    setStudentComment("");
    setValue("");
    setEditError("");
    if (bookingDetailsModal.current) {
      bookingDetailsModal.current.hide();
    }

    setOpenModal(false);

    // Delay restoring scrolling to avoid conflicts with another open modal
    setTimeout(() => {
      if (!document.querySelector(".modal.show")) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    }, 300); // Delay to ensure Bootstrap fully removes modal
  };

  /* ---------------------------------- Data from API --------------------------------- */

  const getTutorNotesAndStudentComment = async () => {
    setLoadingState(true);
    try {
      const result = await bookingApi.getBooking(booking.id);
      setTutorNotes(result.tutor_notes);
      setStudentComment({ comment: result.student_comment, rating: result.rating });
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  const saveTutorNotes = async () => {
    if (role === "student") return;
    setSubmittingState(true);
    try {
      await bookingApi.saveTutorNotes(booking.id, value);
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

  useEffect(() => {
    if (booking.id) {
      getTutorNotesAndStudentComment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, booking]);

  const handleEditTutorNotes = () => {
    if (isEditTutorNotes) {
      if (value < 10) {
        setEditError("請填寫至少10個字。");
        return;
      } else {
        saveTutorNotes();
      }
    }
    setIsEditTutorNotes((prev) => !prev);
    setEditError("");
  };

  return (
    <>
      <div id="bookingDetailsModal" className="modal" ref={bookingDetailsModalRef}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  {!loadingState && (
                    <p className="d-inline-block d-flex justify-content-end fs-7 text-brand-03 fw-medium cursor-pointer mb-3" onClick={handleEditTutorNotes}>
                      {!submittingState && (isEditTutorNotes ? "儲存筆記" : "修改筆記")}
                    </p>
                  )}

                  {submittingState && (
                    <div className="d-flex justify-content-end">
                      <div className="spinner-border text-primary spinner-border-sm " role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
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

                  {isEditTutorNotes && <ReactQuill defaultValue={tutorNotes} onChange={setValue} placeholder="輸入筆記" modules={modules} />}
                </div>
              )}
            </div>

            <div className="modal-footer border-top-0">
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
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student_name: PropTypes.string,
    student_avatar: PropTypes.string,
    tutor_name: PropTypes.string,
    tutor_avatar: PropTypes.string,
    status: PropTypes.oneOf(["in_progress", "completed", "cancelled"]).isRequired, // Adjust based on possible statuses
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
