import { useLocation } from "wouter";
import { useUserStore } from "../store/store";

function Header() {
  const userStore = useUserStore();
  const [_, setLocation] = useLocation();
  return (
    <header className="flex p-4  items-center justify-between w-full h-[50px]">
      <h1 className="text-2xl font-bold">TextIt</h1>
      <div>
        {userStore.userID ? (
          <>
            <div className="peer relative p-[0.6rem] cursor-pointer">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className="flex-col absolute hidden min-w-[275px] right-0 border p-4 peer-hover:flex hover:flex bg-white z-10">
              <p>name : {userStore.name}</p>
              <p>userID : {userStore.userID}</p>
              <p>roomID : {userStore.roomID}</p>
              {userStore.userID == "" ? null : (
                <button
                  type="button"
                  className="p-4 bg-red-700 text-white"
                  onClick={() => {
                    userStore.updateID("");
                    userStore.updateName("");
                    userStore.updateRoomID("");
                    setLocation("/");
                  }}
                >
                  logout
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
