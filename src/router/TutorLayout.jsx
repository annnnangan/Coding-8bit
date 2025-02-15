import { Outlet } from "react-router-dom";

import TutorPanelMenu from "../components/layout/TutorPanelMenu";

export default function AdminLayout() {
  return (
    <>
      <TutorPanelMenu>
        <Outlet />
      </TutorPanelMenu>
    </>
  );
}
