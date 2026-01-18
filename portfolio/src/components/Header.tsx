import React from "react";
type Menu = {
  id: Number;
  name: String;
};
const menulist: Menu[] = [
  { id: 1, name: "About" },
  { id: 2, name: "Skill" },
  { id: 3, name: "Project" },
];
function Header() {
  return (
    <>
      <div className="container-fluid m-0 p-0 z-30 relative">
        <div className="row">
          <div className="header fixed text-center h-12 w-screen m-0 p-0 flex">
            <div className="logo bg-slate-500 w-[15vw] py-2 px-2"></div>

            <div className="menu bg-white w-[70vw] px-2 py-2">
              <ul className="flex gap-6 text-black font-medium">
                {menulist.map((item, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ifo bg-red-400 w-[15vw]">ifo</div>
          </div>
        </div>
      </div>

      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="phone-menu justify-between bg-white h-12 w-screen col-12 m-0 p-0 flex">
            <div className="logo text-center bg-slate-500 w-[25vw] h-[100%]">
              logo
            </div>
            <div className="ifo text-center bg-red-400 w-[15vw] h-[100%]">
              ifo
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
