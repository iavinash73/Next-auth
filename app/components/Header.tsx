"use client";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";

const Header = () => {
  return (
    <header>
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

export default Header;
