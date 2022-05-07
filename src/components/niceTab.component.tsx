import React from "react";

export const NiceTab: React.FC<{
  children: any;
  openTab: number;
  clickHandle: (e: React.MouseEvent<any>, i: number) => unknown;
  i: number;
}> = ({ children, openTab, clickHandle, i }) => {
  return (
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === i ? "text-white bg-sky-600" : "text-sky-600 bg-white")
        }
        onClick={(e) => {
          clickHandle(e, i);
        }}
        data-toggle="tab"
        href="#link1"
        role="tablist"
      >
        {children}
      </a>
    </li>
  );
};
