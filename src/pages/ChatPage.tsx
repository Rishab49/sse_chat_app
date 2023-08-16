import { useEffect, useRef } from "react";
import { Message } from "../types";
import { useMessageStore, useUserStore } from "../store/store";

function ChatPage() {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const userStore = useUserStore();
  const messageStore = useMessageStore();
  console.log();

  useEffect(() => {
    let eventSource = new EventSource(
      `http://${location.hostname}:3000/room/join/${userStore.roomID}/${userStore.userID}/${userStore.name}`
    );

    function handleResponse(data: any) {
      data = JSON.parse(data.data.padEnd());
      console.log(data);
      switch (data.type) {
        case "MSG":
          messageStore.setMessage({
            userID: data.userID,
            msg: data.msg,
            time: data.time,
            name: data.name,
          });
          setTimeout(() => {
            let scrollHeight = scrollContainer.current?.scrollHeight;
            scrollHeight
              ? scrollContainer.current?.scrollTo(0, scrollHeight)
              : null;
          }, 0);
          break;
        case "ID":
          userStore.updateRoomID(data.roomID);
          messageStore.overrideMessages(data.msgs);
          break;
      }
    }
    eventSource.addEventListener("message", handleResponse);
    messageRef.current?.addEventListener("keydown", msgOnEnter);
    return () => {
      eventSource.removeEventListener("message", handleResponse);
      messageRef.current?.removeEventListener("keydown", msgOnEnter);
    };
  }, []);

  function msgOnEnter(e: KeyboardEvent) {
    if (e.key == "Enter") {
      sendMsg();
    }
  }
  function sendMsg() {
    let value: string | undefined = messageRef?.current?.value;
    console.log(value);
    fetch(
      `http://${location.hostname}:3000/room/msg/${userStore.roomID}/${userStore.userID}/${userStore.name}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ msg: value }),
      }
    ).then(() => (messageRef.current ? (messageRef.current.value = "") : null));
  }

  return (
    <div className="flex flex-col w-full flex-1 max-h-[calc(100%_-_50px)]">
      <div
        className="flex flex-col w-full  flex-1 overflow-y-auto"
        ref={scrollContainer}
      >
        {messageStore.messages.map((e: Message, index: number) => (
          <div
            className="w-full flex px-4 py-2"
            style={{
              justifyContent:
                e.userID == userStore.userID ? "flex-end" : "flex-start",
            }}
            key={index}
          >
            <div
              className="w-fit p-2 rounded-xl border min-w-[150px] flex flex-col"
              style={{
                textAlign: e.userID == userStore.userID ? "right" : "left",
                backgroundColor:
                  e.userID == userStore.userID ? "wheat" : "aqua",
              }}
            >
              <div className="flex w-full items-center justify-between text-xs">
                <p>{e.name}</p>
                <p>{new Date(e.time).toLocaleString().split(", ")[1]}</p>
              </div>
              <div className="relative flex w-full items-center justify-between">
                <p className="max-w-[25ch]">{e.msg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row w-full bottom-0">
        <input
          type="text"
          ref={messageRef}
          className="p-4 outline-none flex-1"
          placeholder="Enter you message here"
        ></input>
        <button
          type="button"
          onClick={sendMsg}
          className="p-4 bg-black text-white"
        >
          send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
