import { memo } from "react";

function HeaderComponent() {
  return (
    <div className="flex justify-between py-4 px-4 bg-cyan-600">
      <a href="/" className="font-bold no-underline text-white text-xl">
        Stocks
      </a>
    </div>
  );
}

export const Header = memo(HeaderComponent);
