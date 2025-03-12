import { Navbar } from "./navbar";
import { UserMenu } from "./user-menu";

export const Header = () => {
  return (
    <>
      <header className="h-10 fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-white border-b">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
          <Navbar />
          <UserMenu />
        </div>
      </header>
      <div className="h-10" />
    </>
  );
};
