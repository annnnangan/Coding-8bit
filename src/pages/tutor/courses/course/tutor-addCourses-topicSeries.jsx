import { useState } from "react";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";

import AddContent from "@/components/tutor-panel/course/add/AddContent";
import AddChapter from "@/components/tutor-panel/course/add/AddChapter";
import Loader from "@/components/common/Loader";

export default function TutorManageAddTopicSeries() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const [isAddingChapter, setIsAddingChapter] = useState(false);

  const [newCourseId, setNewCourseId] = useState("");

  const submitApiRequest = async (apiFunc, data) => {
    setLoadingState(true);
    try {
      const result = await apiFunc(data);
      Swal.fire({
        icon: "success",
        title: "課程新增成功",
      });
      setNewCourseId(result.data.data.id);
      setIsAddingChapter(true);
      return result;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 新增主題式課程影片</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="tutor-add-TopicSeriesCourses-wrap container-fluid">
        <h1 className="fs-5 fs-lg-2">新增主題式課程影片 - 課程基本資料</h1>

        <div className="row f-center">
          {!isAddingChapter ? (
            <AddContent
              setLoadingState={setLoadingState}
              submitApiRequest={submitApiRequest}
              type="topicSeries"
            />
          ) : (
            <AddChapter
              newCourseId={newCourseId}
              setLoadingState={setLoadingState}
            />
          )}
        </div>
      </main>
    </>
  );
}
