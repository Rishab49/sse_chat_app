# SSE Chat App

https://github.com/Rishab49/sse_chat_app/assets/25582966/a83de670-07e6-4325-8b7f-f63a01b1ff0a

## Introduction
This chat application is a demontration of how we can create a chat application without using websockets. It uses Server Sent Events(SSE) which is a technology enabling client(s) to receive updates in realtime from server. It is a one way communication protocol in which only server can send data to clients. It is fast and very easy to implement and does not requires any additional libraies. 

## Technologies

+ React
+ Typescript
+ TailwindCSS
+ Zustand
+ Express

## Testing
You can test this app by cloning it and then running following commands in 2 separate terminals 
1. `pnpm install`
2. `pnpm run dev`
3. `nodemon server/index.js`

## Additional
`TOKEN_SECRET` is provided in `.env` file intentionally in case you do not want to create one manually.
