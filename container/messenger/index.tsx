import React, { useEffect } from 'react'
import style from "./style/messenger.module.scss";
import { BASE_URL } from '../../services/config';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
let socket;

export default function Messenger() {
  const state = useSelector((state: any) => state?.auth)
  const eventHandler = () => { console.log("event") };
  useEffect(() => {
    socket = io("localhost:3000",{
      path: "/ws",
      transports: ["websocket"],
      autoConnect: true,
      host: "localhost:3000",
      port: "3000",
      hostname: "localhost",
      query: 
        {
          "jwt": `{{${state.token}}}`,
          
        }
      
    })
    socket.on("connect_error", (err) => {
      console.log("1111sdgsdgg");
      
      console.log(`connect_error due to ${err}`);
    });
    socket.on("connect", () => {
      console.log("sdgsdg222g");
      console.log(socket.connected);
    });

    // socket.emit("CHAT_JOIN",JSON.stringify({key:Date.now()}));
    socket.on("CHAT_JOIN_RESULT", (result) => {
      console.log({result});
      
    });
  }, [])

  return (
    <div className={style["container"]}>320*800</div>
  )
}
