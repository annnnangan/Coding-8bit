import { useState } from "react";

export default function EducationSection() {
  const [education, setEducation] = useState({
    id: "uuid",
    tutor_id: "uuid",
    school_name: "University of Education",
    major: "Mathematics",
    degree: "Bachelor of Science",
    start_year: 2015,
    end_year: 2019,
  });

  // 切換學歷編輯狀態
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const handleEditEducation = () => {
    setIsEditingEducation((prev) => (prev = !prev));
  };

  return (
    <section className="bg-white rounded-3 mt-4 mt-lg-6 px-4 px-md-10 py-4 py-md-6">
      <h2 className="fs-6 fs-md-5 fw-bold">學歷</h2>
      <form>
        <div>
          <div className="fs-6 mt-2 mt-md-4">
            <label className="form-label" htmlFor="school_name">
              學校名稱
            </label>
            {!isEditingEducation ? (
              <p className="fs-5 mb-2 fw-medium">{education.school_name}</p>
            ) : (
              <input
                id="school_name"
                type="text"
                name="學校名稱"
                className="form-control fw-bold"
                placeholder="請輸入學校名稱"
              />
            )}
          </div>
        </div>

        <button
          className={`btn btn-brand-03 rounded-2 mt-md-4 ${
            isEditingEducation && "d-none"
          }`}
          type="button"
          onClick={handleEditEducation}
        >
          編輯
        </button>
        <div>
          <button
            className={`btn btn-brand-03 rounded-2 mt-md-4 ${
              !isEditingEducation && "d-none"
            }`}
            type="button"
          >
            更新工作經歷
          </button>
          <button
            type="submit"
            className={`btn btn-outline-none rounded-2 mt-2 mt-md-4 ms-2 ${
              !isEditingEducation && "d-none"
            }`}
            onClick={handleEditEducation}
          >
            取消
          </button>
        </div>
      </form>
    </section>
  );
}
