import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";

import { utils } from "../../custom-course/utils";

export default function CancelConfirmationModal({ booking, isOpen, setOpenModal, setOpenDetailsModal }) {
  const modal = useRef(null);
  const modalRef = useRef(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (modalRef.current) {
      if (modal.current) {
        modal.current.dispose(); // Destroy old modal instance
      }
      modal.current = new bootstrap.Modal(modalRef.current, { backdrop: "static" });
    }
  }, [modalRef]);

  //Handle modal open
  useEffect(() => {
    if (isOpen) {
      modal.current.show();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (modal.current) {
      modal.current.hide();
    }
    setOpenModal(false);
    setOpenDetailsModal(true);

    // Delay restoring scrolling to avoid conflicts with another open modal
    setTimeout(() => {
      if (!document.querySelector(".modal.show")) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    }, 300); // Delay to ensure Bootstrap fully removes modal
  };

  const handleConfirmCancel = () => {
    console.log("Cancel reason:", cancelReason);
    setOpenModal(false);
  };

  return (
    <div id="cancelConfirmationModal" className="modal" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title">取消預約確認</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p className="mb-3">
              你確定要取消與 {booking.student} 於 {utils.formatDateWithYear(new Date(booking.start_time))} {utils.formatOnlyTime(new Date(booking.start_time))} -
              {utils.formatOnlyTime(new Date(booking.end_time))} 的預約嗎？
            </p>
            <p className="fs-7">取消原因：</p>
            <textarea className="form-control" rows="3" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder="輸入取消原因..." style={{ fontSize: "14px" }}></textarea>
          </div>
          <div className="modal-footer border-top-0">
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              取消
            </button>
            <button className="btn btn-danger" onClick={handleConfirmCancel}>
              確認取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CancelConfirmationModal.propTypes = {
  booking: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setOpenDetailsModal: PropTypes.func.isRequired,
};
