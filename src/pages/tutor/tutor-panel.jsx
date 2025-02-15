import { useState } from "react";
import { Helmet } from "react-helmet-async";

import Loader from "../../components/common/Loader";

export default function TutorPanel() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 新增課程影片</title>
      </Helmet>
      {loadingState && <Loader />}

      <h1>暫定此頁為講師後台儀表板</h1>
    </>
  );
}
