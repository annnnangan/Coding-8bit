import { Outlet } from "react-router-dom";

import TutorPanelMenu from "../components/layout/TutorPanelMenu";

export default function TutorLayout() {
  return (
    <>
      <TutorPanelMenu>
        <Outlet />
      </TutorPanelMenu>
    </>
  );
}
