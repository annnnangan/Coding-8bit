import { useState } from "react";

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState({
    id: "uuid",
    tutor_id: "uuid",
    title: "Certified Math Tutor",
    issuer: "Math Certification Board",
    issued_date: "2021-01-01",
  });

  // 切換證照編輯狀態
  const [isEditingCertificates, setIsEditingCertificates] = useState(false);
  const handleEditCertificates = () => {
    setIsEditingCertificates((prev) => (prev = !prev));
  };

  return (
    <section className="bg-white rounded-3 mt-4 mt-lg-6 px-4 px-md-10 py-4 py-md-6">
      <h2 className="fs-6 fs-md-5 fw-bold">證書</h2>
      <form>
        <div>
          <div className="fs-6 mt-2 mt-md-4">
            <label className="form-label" htmlFor="title">
              證書名稱
            </label>
            {!isEditingCertificates ? (
              <p className="fs-5 mb-2 fw-medium">{certificates.title}</p>
            ) : (
              <input
                id="title"
                type="text"
                name="證書名稱"
                className="form-control fw-bold"
                placeholder="請輸入證書名稱"
              />
            )}
          </div>
        </div>

        <button
          className={`btn btn-brand-03 rounded-2 mt-md-4 ${
            isEditingCertificates && "d-none"
          }`}
          type="button"
          onClick={handleEditCertificates}
        >
          編輯
        </button>
        <div>
          <button
            className={`btn btn-brand-03 rounded-2 mt-md-4 ${
              !isEditingCertificates && "d-none"
            }`}
            type="button"
          >
            更新工作經歷
          </button>
          <button
            type="submit"
            className={`btn btn-outline-none rounded-2 mt-2 mt-md-4 ms-2 ${
              !isEditingCertificates && "d-none"
            }`}
            onClick={handleEditCertificates}
          >
            取消
          </button>
        </div>
      </form>
    </section>
  );
}
