import { useEffect, useState } from "react";

function CreatePage() {
  const [userID, setUserID] = useState("");
  useEffect(() => {
    fetch(`http://${location.hostname}:3000/create/userID`).then((res) => {
      res.json().then((body) => setUserID(body.msg));
    });
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        method="POST"
        action={`http://${location.hostname}:3000/create`}
        encType="multipart/form-data"
        className="flex flex-col items-stretch w-[300px] gap-4"
      >
        <input
          type="text"
          name="userID"
          className="p-4 border"
          value={userID}
          readOnly
        ></input>
        <input
          type="text"
          name="username"
          className="p-4 border"
          required
        ></input>
        <input
          type="password"
          name="password"
          className="p-4 border"
          required
        ></input>
        <button
          type="submit"
          className="flex items-center justify-center p-4 bg-black text-white"
        >
          Create Account
        </button>
        <div className="flex gap-2 items-center">
          <hr className="flex-1"></hr>
          <p>or</p>
          <hr className="flex-1"></hr>
        </div>
        <a
          href="/"
          className="flex items-center justify-center p-4 bg-black text-white"
        >
          Login
        </a>
      </form>
    </div>
  );
}

export default CreatePage;
