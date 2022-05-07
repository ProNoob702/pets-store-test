export const NavBar: React.FC<{}> = () => {
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="flex w-full items-center relative">
            <img
              className="w-12 mr-1"
              alt="logo"
              src="https://static.thenounproject.com/png/1859362-200.png"
            />
            <span className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              Pets-Store
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};
