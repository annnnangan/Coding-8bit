import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ exp, isEditing }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exp.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="f-align-center gap-11"
    >
      <div className="fs-6 mt-2 mt-md-4">
        <label className="form-label" htmlFor="company">
          公司名稱
        </label>
        {isEditing ? (
          <input
            type="text"
            className="form-control fw-bold"
            defaultValue={exp.company}
          />
        ) : (
          <p className="fs-5 mb-2 fw-medium">{exp.company}</p>
        )}
      </div>
      <div className="fs-6 mt-2 mt-md-4">
        <label className="form-label" htmlFor="position">
          職稱
        </label>
        {isEditing ? (
          <input
            type="text"
            className="form-control fw-bold"
            defaultValue={exp.position}
          />
        ) : (
          <p className="fs-5 mb-2 fw-medium">{exp.position}</p>
        )}
      </div>
    </li>
  );
}
