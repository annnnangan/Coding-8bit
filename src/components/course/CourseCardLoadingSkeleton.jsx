export default function CourseCardLoadingSkeleton() {
  return (
    <div className="course-card">
      <div className="card gradient-border p-lg-6 p-4">
        <div className="overflow-hidden img-wrapper rounded position-relative">
          <div className="placeholder-glow card-img-top cover-img">
            <span
              className="placeholder bg-brand-02 w-full mb-1"
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
              }}
            ></span>
          </div>
        </div>

        <div className="card-body p-0 mt-3 mt-lg-4 f-column-between">
          <div>
            <div className="placeholder-glow d-flex flex-column">
              <span className="placeholder bg-brand-02 w-25 mb-1"></span>
              <span className="placeholder bg-brand-02 w-75 mb-1"></span>
              <span className="placeholder bg-brand-02 w-25 mb-1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
