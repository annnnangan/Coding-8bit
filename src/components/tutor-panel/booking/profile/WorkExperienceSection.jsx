import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function WorkExperienceSection() {
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: "uuid",
      tutor_id: "uuid",
      company: "High School",
      position: "Math Teacher",
      start_date: "2019-09-01",
      end_date: "2021-06-30",
      description: "Taught mathematics to high school students.",
    },
    {
      id: "uuid",
      tutor_id: "uuid",
      company: "High School",
      position: "Math Teacher",
      start_date: "2019-09-01",
      end_date: "2021-06-30",
      description: "Taught mathematics to high school students.",
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = workExperiences.findIndex((exp) => exp.id === active.id);
      const newIndex = workExperiences.findIndex((exp) => exp.id === over.id);
      setWorkExperiences(arrayMove(workExperiences, oldIndex, newIndex));
    }
  };

  // 切換工作經歷編輯狀態
  const [isEditingWorkExperience, setIsEditingWorkExperience] = useState(false);
  const handleEditWorkExperiences = () => {
    setIsEditingWorkExperience((prev) => (prev = !prev));
  };

  return (
    <section className="bg-white rounded-3 px-4 px-md-10 py-4 py-md-6">
      <h2 className="fs-6 fs-md-5 fw-bold">工作經歷</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={workExperiences}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {workExperiences.map((exp) => (
              <SortableItem
                key={exp.id}
                exp={exp}
                isEditing={isEditingWorkExperience}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <button
        className="btn btn-brand-03 rounded-2 mt-md-4"
        onClick={() => setIsEditingWorkExperience((prev) => !prev)}
      >
        {isEditingWorkExperience ? "完成編輯" : "編輯"}
      </button>
    </section>
  );
}
