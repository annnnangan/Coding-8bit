export default function TutorCardLoadingSkeleton() {
  return (
    <div
      className="card p-lg-5 p-md-4 p-4 img-hover-enlarge h-100"
      style={{ boxShadow: "0px 25px 50px -12px #0000001F" }}
    >
      <div className="card-body p-0 d-flex flex-column">
        <div className="mb-5 d-flex">
          <div className="placeholder-glow">
            <span
              className="placeholder rounded-circle bg-brand-02 me-4"
              style={{ width: "45px", height: "45px" }}
            ></span>
          </div>

          <div className="placeholder-glow d-flex flex-column" style={{ width: "80%" }}>
            <span className="placeholder bg-brand-02 w-25 mb-1"></span>
            <span className="placeholder bg-brand-02 w-50 mb-1"></span>
          </div>
        </div>

        <div className="mb-5">
          <div className="placeholder-glow d-flex flex-column">
            <span className="placeholder bg-brand-02 w-25 mb-1"></span>
          </div>
        </div>

        <div className="mb-lg-6 mb-5 mt-auto">
          <div className="placeholder-glow d-flex flex-column">
            <span className="placeholder bg-brand-02 w-50 mb-1"></span>
            <span className="placeholder bg-brand-02 w-75 mb-1"></span>
          </div>
        </div>

        <div className="placeholder-glow w-full ">
          <span className="placeholder bg-brand-02 w-50 mb-1"></span>
        </div>
      </div>
    </div>
  );
}
