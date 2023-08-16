import { Link } from "wouter";

function Error({ type }: { type: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      {type == "invalid_user" ? (
        <>
          <h1 className="text-3xl">Invalid username or password</h1>
          <Link href="/">Go back</Link>
        </>
      ) : (
        <h1>Something went wrong</h1>
      )}
    </div>
  );
}

export default Error;
