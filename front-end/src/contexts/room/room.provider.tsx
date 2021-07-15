import * as React from "react";
import { RoomContext } from "./room.context";
import roomApi from "api/room";
import { history } from "App";
import swal from "sweetalert";

export interface IRoomProviderProps {
  children: JSX.Element;
}

const initialState = {};

export default function RoomProvider(props: IRoomProviderProps) {
  const { children } = props;
  const [roomReducer, setRoomReducer] = React.useState(initialState);

  const joinRoom = async (roomId: string) => {
    await roomApi.join({ roomId: roomId }).then((res) => {
      const { room } = res.data;
      setRoomReducer(room);
      localStorage.setItem("currentRoom", JSON.stringify(room));
      history.push(`/room/${roomId}`);
      swal(`Welcome to ${room.name}`, "", "success");
    });
  };

  const createRoom = async (roomName: string) => {
    await roomApi.create({ name: roomName }).then((res) => {
      const { room } = res.data;
      setRoomReducer(room);
      localStorage.setItem("currentRoom", JSON.stringify(room));
      history.push(`/room/${room.roomId}`);
      swal(`Welcome to ${room.name}`, "", "success");
    });
  };

  const getAllRoom = async () => {
    roomApi
      .getAllRoom()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
      });
  };

  return (
    <RoomContext.Provider
      value={{ roomReducer, setRoomReducer, joinRoom, createRoom, getAllRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
}
