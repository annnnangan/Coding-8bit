import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="not-found">
        <h1>404 - 找不到頁面</h1>
        <p>抱歉，您所尋找的頁面不存在。</p>
        <button type="button" className="btn btn-brand-03" onClick={toPrevPage}>
          回上一頁
        </button>
      </div>
    </>
  );
}
