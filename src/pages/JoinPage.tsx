import { useEffect, useRef } from "react";
import { useUserStore } from "../store/store";
import { JoinPageProps } from "../types";
import { useLocation } from "wouter";

function JoinPage({ userID,name }: JoinPageProps) {
  const roomRef = useRef<HTMLInputElement | null>(null);
  const userStore = useUserStore();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    userStore.updateID(userID);
    userStore.updateName(decodeURI(name));
  }, []);
  function createRoom() {
    fetch(`http://${window.location.hostname}:3000/room/create`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        userStore.updateRoomID(data.roomID);
        setLocation("/chat");
      });
    });
  }

  function joinRoom() {
    let roomID = roomRef?.current?.value;
    roomID
      ? (userStore.updateRoomID(roomID), setLocation("/chat"))
      : alert("please enter a valid room id");
  }

  return (
    <div className="flex flex-col gap-4 items-center w-fit flex-1 justify-center">
      <button
        type="button"
        onClick={createRoom}
        className="p-4 bg-black text-white w-full"
      >
        create room
      </button>
      <p>or</p>
      <div className="flex items-center ">
        <input
          type="text"
          placeholder="roomID"
          ref={roomRef}
          className="p-4 outline-none border"
        ></input>
        <button
          type="button"
          onClick={ joinRoom}
          className="p-4 bg-black text-white"
        >
          join room
        </button>
      </div>
    </div>
  );
}

export default JoinPage;
