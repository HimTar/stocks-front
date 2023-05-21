import { Header } from "./components/common/Header/Header";
import Router from "./Router";

import "@coreui/coreui/dist/css/coreui.min.css";
import { memo } from "react";

function AppComponent() {
  return (
    <div className="flex items-center justify-center">
      <div className="container w=[79rem]">
        <Header />

        <Router />
      </div>
    </div>
  );
}

export default memo(AppComponent);
