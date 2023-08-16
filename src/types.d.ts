interface Message {
  msg: string;
  userID: string;
  time: string;
  name:string
}

interface JoinPageProps {
    userID:string,
    name:string
}


interface HeaderProps {
  userID: string;
  roomID: string;
}
export { JoinPageProps, Message, HeaderProps };
