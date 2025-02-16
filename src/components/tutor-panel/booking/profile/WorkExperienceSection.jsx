import { useState } from "react";

export default function WorkExperienceSection() {
  const [workExperience, setWorkExperience] = useState({
    id: "uuid",
    tutor_id: "uuid",
    company: "High School",
    position: "Math Teacher",
    start_date: "2019-09-01",
    end_date: "2021-06-30",
    description: "Taught mathematics to high school students.",
  });

  // 切換工作經歷編輯狀態
  const [isEditingWorkExperience, setIsEditingWorkExperience] = useState(false);
  const handleEditWorkExperience = () => {
    setIsEditingWorkExperience((prev) => (prev = !prev));
  };

  return (
    <section className="bg-white rounded-3 px-4 px-md-10 py-4 py-md-6">
      <h2 className="fs-6 fs-md-5 fw-bold">工作經歷</h2>
      <form>
        <ul>
          <li className="f-align-center gap-11">
            <div className="fs-6 mt-2 mt-md-4">
              <label className="form-label" htmlFor="company">
                公司名稱
              </label>
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.company}</p>
              ) : (
                <input
                  id="company"
                  type="text"
                  name="公司名稱"
                  className="form-control fw-bold"
                  placeholder="請輸入公司名稱"
                />
              )}
            </div>
            <div className="fs-6 mt-2 mt-md-4">
              <label className="form-label" htmlFor="position">
                職稱
              </label>
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.position}</p>
              ) : (
                <input
                  id="position"
                  type="text"
                  name="職稱"
                  className="form-control fw-bold"
                  placeholder="請輸入職稱"
                />
              )}
            </div>
            <div className="fs-6 mt-2 mt-md-4">
              <label className="form-label" htmlFor="position">
                在職年份
              </label>
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.start_date}</p>
              ) : (
                <input
                  id="start_date"
                  type="text"
                  name="在職年份"
                  className="form-control fw-bold"
                  placeholder="請輸入在職年份"
                />
              )}
            </div>
            <div className="fs-6 mt-2 mt-md-4">
              <label className="form-label" htmlFor="end_date">
                離職年份
              </label>
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.end_date}</p>
              ) : (
                <input
                  id="end_date"
                  type="text"
                  name="職稱"
                  className="form-control fw-bold"
                  placeholder="請輸入職稱"
                />
              )}
            </div>
            <button
              className={`btn btn-brand-03 rounded-2 mt-md-4 ${
                isEditingWorkExperience && "d-none"
              }`}
              type="button"
              onClick={handleEditWorkExperience}
            >
              編輯
            </button>
          </li>
          <li className="f-align-center gap-11">
            <div className="fs-6 mt-2 mt-md-4">
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.company}</p>
              ) : (
                <input
                  id="company"
                  type="text"
                  name="公司名稱"
                  className="form-control fw-bold"
                  placeholder="請輸入公司名稱"
                />
              )}
            </div>
            <div className="fs-6 mt-2 mt-md-4">
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.position}</p>
              ) : (
                <input
                  id="position"
                  type="text"
                  name="職稱"
                  className="form-control fw-bold"
                  placeholder="請輸入職稱"
                />
              )}
            </div>
            <div className="fs-6 mt-2 mt-md-4">
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.start_date}</p>
              ) : (
                <input
                  id="start_date"
                  type="text"
                  name="在職年份"
                  className="form-control fw-bold"
                  placeholder="請輸入在職年份"
                />
              )}
            </div>
            <div className="fs-6 mt-2 mt-md-4">
              {!isEditingWorkExperience ? (
                <p className="fs-5 mb-2 fw-medium">{workExperience.end_date}</p>
              ) : (
                <input
                  id="end_date"
                  type="text"
                  name="職稱"
                  className="form-control fw-bold"
                  placeholder="請輸入職稱"
                />
              )}
            </div>
            <button
              className={`btn btn-brand-03 rounded-2 mt-md-4 ${
                isEditingWorkExperience && "d-none"
              }`}
              type="button"
              onClick={handleEditWorkExperience}
            >
              編輯
            </button>
          </li>
        </ul>

        <div>
          <button
            className={`btn btn-brand-03 rounded-2 mt-md-4 ${
              !isEditingWorkExperience && "d-none"
            }`}
            type="button"
          >
            更新工作經歷
          </button>
          <button
            type="submit"
            className={`btn btn-outline-none rounded-2 mt-2 mt-md-4 ms-2 ${
              !isEditingWorkExperience && "d-none"
            }`}
            onClick={handleEditWorkExperience}
          >
            取消
          </button>
        </div>
      </form>
    </section>
  );
}
