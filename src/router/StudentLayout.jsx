import { Outlet } from "react-router-dom";

import StudentPanelMenu from "../components/layout/StudentPanelMenu";

export default function StudentLayout() {
  return (
    <>
      <StudentPanelMenu>
        <Outlet />
      </StudentPanelMenu>
    </>
  );
}
