export default function BookingCardLoadingSkeleton() {
  return (
    <>
      <div className="card">
        <div className="card-body p-3">
          <div className="d-flex gap-3 gap-md-2">
            <div className="col-3 d-flex flex-column justify-content-center align-items-center p-2  rounded-2">
              <div className="placeholder-glow">
                <span className="placeholder bg-brand-02 col-12" style={{ width: "80px", height: "100px" }}></span>
              </div>
            </div>
            <div className="col-8">
              <div className="placeholder-glow">
                <span className="placeholder bg-brand-02 col-12 mb-1"></span>
                <span className="placeholder bg-brand-02 col-12 mb-1"></span>
                <span className="placeholder bg-brand-02 col-12 mb-1"></span>
                <span className="placeholder bg-brand-02 col-12 mb-1"></span>
                <span className="placeholder bg-brand-02 col-12"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
