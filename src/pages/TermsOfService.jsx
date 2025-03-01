import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 服務條款 (Terms of Service)</title>
      </Helmet>

      <main className="privacy-policy-wrap ">
        <div className="container py-6 py-lg-13">
          <div className="px-lg-13">
            <h1 className="fs-3 fs-lg-1">Coding-8bit Backend 應用程式</h1>
            <h2 className="fs-4 fs-lg-2 mt-4 mt-lg-6">服務條款 (Terms of Service)</h2>
            <p className="mt-2">更新日期：2025-02-28</p>
            <p className="mt-4 mt-lg-6">
              使用 Coding-8bit Backend
              服務前，請仔細閱讀本服務條款。您註冊並使用本服務即表示您同意本條款。
            </p>

            <ul className="fs-lg-5 mt-4 mt-lg-6">
              <li>
                <h3 className="fs-5 fs-lg-3">1. 服務內容</h3>
                <p className="mt-2 mt-lg-4">我們提供以下功能與服務：</p>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>使用者管理、檔案上傳、課程管理、預約、付款等功能</li>
                  <li>學習需求客製化、一對一教學預約服務</li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">2. 使用者帳號</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>使用者須年滿特定年齡（依當地法律規定）方可註冊帳號</li>
                  <li>使用者有責任確保帳號與密碼的安全</li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">3. 使用者行為規範</h3>
                <p className="mt-2 mt-lg-4">使用者不得從事以下行為：</p>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>從事非法活動或侵犯他人權益</li>
                  <li>傳惡意檔案或散播不實資訊</li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">4. 智慧財產權</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>
                    本應用程式及內容（如影片、文字、圖像等）受智慧財產權保護
                  </li>
                  <li>未經授權，不得複製、修改或散布本服務內容</li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">5. 免責聲明</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>我們不保證應用程式的絕對穩定性或無錯誤</li>
                  <li>因使用本服務而造成的任何損失，我們概不負責</li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">6. 服務變更與終止</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>
                    我們保留隨時修改或終止服務的權利，並將以適當方式通知使用者
                  </li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">7. 法律適用與管轄權</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>本服務條款受特定地區法律管轄</li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">8. 條款變更</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>
                    我們保留隨時修改服務條款的權利，並將以適當方式通知使用者
                  </li>
                </ul>
              </li>

              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">9. 聯絡方式</h3>
                <p className="mt-2 mt-lg-4">
                  如有任何條款相關問題，請聯繫我們：
                  <a
                    href="mailto:coding8bit@gmail.com"
                    className="underline-hover d-inline"
                  >
                    coding8bit@gmail.com
                  </a>
                </p>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-brand-03 mt-8 mt-lg-10"
              onClick={toPrevPage}
            >
              回上一頁
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
