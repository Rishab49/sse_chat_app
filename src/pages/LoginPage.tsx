function LoginPage() {
  let hostname = location.hostname;
  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        method="POST"
        action={`http://${hostname}:3000/login`}
        encType="multipart/form-data"
        className="flex flex-col items-stretch w-[300px] gap-4"
      >
        <input type="text" name="userID" className="p-4 border"></input>
        <input type="password" name="password" className="p-4 border"></input>
        <button
          type="submit"
          className="flex items-center justify-center p-4 bg-black text-white"
        >
          Login
        </button>
        <div className="flex gap-2 items-center">
          <hr className="flex-1"></hr>
          <p>or</p>
          <hr className="flex-1"></hr>
        </div>
        <a
          href="/create-account"
          className="flex items-center justify-center p-4 bg-black text-white"
        >
          Create account
        </a>
      </form>
    </div>
  );
}

export default LoginPage;
