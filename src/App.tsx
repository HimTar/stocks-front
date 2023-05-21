import { memo } from "react";

import Router from "./Router";

import { Header } from "./components/common/Header/Header";

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
