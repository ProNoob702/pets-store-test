import React from "react";
import { AppFooter } from "./footer";
import { NavBar } from "./navBar";

export const AppLayout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />
      <main className="grow overflow-y-auto pb-5">
        <div className="container m-auto">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
};
