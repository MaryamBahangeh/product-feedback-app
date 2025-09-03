import Header from "@/components/Header/Header.tsx";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
