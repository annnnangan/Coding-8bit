import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";
import ReactQuill from "react-quill-new";

import { utils } from "../custom-course/utils";
import { determineMeetingLinkMessage } from "../../utils/booking-record-utils";

import AvatarWithFallback from "../../components/common/AvatarWithFallback";
import BookingStatusBadge from "./BookingStatusBadge";
import CancelConfirmationModal from "./CancelConfirmationModal";

export default function BookingDetailsModal({ booking, isOpen, setOpenModal }) {
  const [isOpenCancelModal, setOpenCancelModal] = useState(false);
  const [isOpenRescheduleModal, setOpenRescheduleModal] = useState(false);

  // ReactQuill 文字編輯器
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [[{ font: [] }], ["bold", "italic", "underline"], ["link", "image", "video"], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["blockquote", "code-block"], ["clean"]],
  };

  // modal
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
    if (isOpen && !isOpenCancelModal) {
      bookingDetailsModal.current.show();
    } else {
      bookingDetailsModal.current.hide();
    }
  }, [isOpen, isOpenCancelModal]);

  const handleCloseModal = () => {
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

  return (
    <>
      <div id="bookingDetailsModal" className="modal" ref={bookingDetailsModalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom-0">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <AvatarWithFallback image={booking.student_avatar || ""} name={booking.student} fontSize="fs-lg-4 fs-5" />
                <BookingStatusBadge status={booking.status} />
              </div>

              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
            </div>

            <div className="modal-body p-4">
              <ul className="d-flex flex-column align-items-start">
                <li className="f-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-brand-03">calendar_today</span>
                  <p>{utils.formatDateWithYear(new Date(booking.start_time))}</p>
                </li>
                <li className="f-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-brand-03">schedule</span>
                  <p>
                    {utils.formatOnlyTime(new Date(booking.start_time))} - {utils.formatOnlyTime(new Date(booking.end_time))}
                  </p>
                </li>
                <li className="f-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-brand-03">link</span>
                  <p>{determineMeetingLinkMessage(booking.type, booking.status, booking.meeting_link)}</p>
                </li>
                <li className="f-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-brand-03">local_library</span>
                  <p>{booking.type}</p>
                </li>
              </ul>
              <div className="mb-6 mb-md-8">
                <p className="fs-5 fs-md-4 fw-medium fw-md-bold mb-3 mb-md-4">希望接受指導的項目</p>
                <p>{booking.details}</p>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3 mb-md-4">
                  <p className="fs-5 fs-md-4 fw-medium fw-md-bold">老師筆記</p>
                  <p className="fs-7 text-brand-03 fw-medium cursor-pointer">{booking.tutor_notes ? "修改筆記" : "儲存筆記"}</p>
                </div>

                {booking.tutor_notes ? <p>{booking.tutor_notes}</p> : <ReactQuill value={value} onChange={setValue} placeholder="輸入筆記" modules={modules} />}
              </div>
            </div>

            <div className="modal-footer border-top-0">
              <button
                className="col btn btn-outline-brand-03 fs-6 f-center gap-2"
                type="button"
                onClick={() => {
                  setOpenModal(false);
                  setOpenCancelModal(false);
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
                  setOpenCancelModal(true);
                }}
              >
                <span className="material-symbols-outlined">event_busy</span> 取消預約
              </button>
            </div>
          </div>
        </div>
      </div>
      <CancelConfirmationModal booking={booking} isOpen={isOpenCancelModal} setOpenModal={setOpenCancelModal} setOpenDetailsModal={setOpenModal} />
    </>
  );
}

BookingDetailsModal.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student: PropTypes.string.isRequired,
    student_avatar: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["in_progress", "completed", "canceled"]).isRequired, // Adjust based on possible statuses
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meeting_link: PropTypes.string, // Can be null, so not required
    source_code_url: PropTypes.string, // Can be null, so not required
    details: PropTypes.string.isRequired,
    tutor_notes: PropTypes.string, // Can be null, so not required
  }),
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func,
};
