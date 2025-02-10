import BookingStatusBadge from "./BookingStatusBadge";

export default function BookingCard() {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <div className="col-3 d-flex flex-column align-items-center bg-gray-04 p-2 p-lg-5 rounded-2 me-5" style={{ aspectRatio: "1" }}>
              <h2 className="text-brand-03">29</h2>
              <p className="fs-7">星期日</p>
            </div>
            <div className="col-8">
              <ul>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p>陳大富</p>

                  <BookingStatusBadge status="in_progress" />
                </li>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p className="fs-7 text-gray-03">時間</p>
                  <p className="text-gray-01">10:00 - 11:00</p>
                </li>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p className="fs-7 text-gray-03">會議連結</p>
                  <p className="text-gray-01">將於開始前一天釋出</p>
                </li>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p className="fs-7 text-gray-03">預約類型</p>
                  <p className="text-gray-01">一對一教學</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
