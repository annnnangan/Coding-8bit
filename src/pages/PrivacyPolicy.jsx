import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 隱私權政策 (Privacy Policy)</title>
      </Helmet>

      <main className="privacy-policy-wrap ">
        <div className="container py-6 py-lg-13">
          <div className="px-lg-13">
            <h1 className="fs-3 fs-lg-1">Coding-8bit Backend 應用程式</h1>
            <h2 className="fs-4 fs-lg-2 mt-4 mt-lg-6">
              隱私權政策 (Privacy Policy)
            </h2>
            <p className="mt-2">更新日期：2025-02-28</p>
            <p className="mt-4 mt-lg-6">
              Coding-8bit Backend
              尊重並保護使用者的個人隱私。本隱私權政策說明我們如何收集、使用、儲存及保護您的個人資訊。
            </p>

            <ul className="fs-lg-5 mt-4 mt-lg-6">
              <li>
                <h3 className="fs-5 fs-lg-3">1. 資料收集</h3>
                <p className="mt-2 mt-lg-4">
                  我們可能會收集以下類型的個人資訊：
                </p>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>註冊與登入資訊：如使用者名稱、電子郵件、頭像 URL。</li>
                  <li>課程預約資訊：使用者填寫的預約需求細節。</li>
                  <li>檔案上傳資訊：使用者上傳的照片、影片或其他檔案。</li>
                </ul>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">2. 資料使用</h3>
                <p className="mt-2 mt-lg-4">收集的資訊將用於以下用途： </p>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>身份驗證與授權</li>
                  <li>提供及客製化課程內容與預約服務</li>
                  <li>發送通知，如課程提醒、系統更新</li>
                </ul>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">3. 資料分享</h3>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>
                    除非獲得使用者明確同意，否則不會與第三方分享個人資訊。
                  </li>
                  <li>可能與合作夥伴共享匿名化數據，以提升服務品質。</li>
                </ul>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">4. 資料安全</h3>
                <p className="mt-2 mt-lg-4">
                  我們採取以下措施來保護您的個人資料：
                </p>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>使用 JWT（JSON Web Token）進行身份驗證</li>
                  <li>限制上傳檔案的大小與格式，並進行安全掃描</li>
                  <li>定期備份資料庫，以防止資料遺失</li>
                </ul>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">5. 使用者權利</h3>
                <p className="mt-2 mt-lg-4">使用者擁有以下權利：</p>
                <ul className="disc-list-style ps-6 mt-2 mt-lg-4">
                  <li>存取、修改或刪除個人資訊</li>
                  <li>撤回對個人資訊使用的同意</li>
                </ul>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">6. Cookie 與追蹤技術</h3>
                <p className="mt-2 mt-lg-4">
                  我們可能使用 Cookie 或類似技術來改善使用者體驗。
                </p>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">7. 隱私權政策變更</h3>
                <p className="mt-2 mt-lg-4">
                  我們保留隨時修改隱私權政策的權利，並將以適當方式通知使用者。
                </p>
              </li>
              <li className="mt-8 mt-lg-10">
                <h3 className="fs-5 fs-lg-3">8. 聯絡方式</h3>
                <p className="mt-2 mt-lg-4">
                  如有任何隱私權相關問題，請聯繫我們：
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
