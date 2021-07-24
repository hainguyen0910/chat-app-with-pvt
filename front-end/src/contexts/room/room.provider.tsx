import roomApi from "api/room";
import { history } from "App";
import { AppContext } from "contexts/app/app.context";
import * as React from "react";
import swal from "sweetalert";
import { RoomContext } from "./room.context";

interface IRoomProviderProps {
  children: JSX.Element;
}

interface AppContextInterface {
  isLoading: boolean;
  setIsLoading: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}

const initialState = {};

export default function RoomProvider(props: IRoomProviderProps) {
  const { children } = props;
  const [roomReducer, setRoomReducer] = React.useState(initialState);
  const [rooms, setRooms] = React.useState([]);
  const appContext: AppContextInterface = React.useContext(AppContext);
  const { setIsLoading } = appContext;

  const getAllRoom = async () => {
    roomApi
      .getAllRoom()
      .then((res) => {
        setRooms(res.data.rooms);
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
      });
  };

  const joinRoom = async (roomId: string) => {
    setIsLoading.on();
    await roomApi
      .join({ roomId: roomId })
      .then((res) => {
        const { room } = res.data;
        setRoomReducer(room);
        setIsLoading.off();
        swal(`Welcome to ${room.name}`, "", "success");
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
        setIsLoading.off();
      });
  };

  const createRoom = async (roomName: string) => {
    setIsLoading.on();
    await roomApi
      .create({ name: roomName })
      .then((res) => {
        const { room } = res.data;
        setRoomReducer(room);
        setIsLoading.off();
        swal(`Welcome to ${room.name}`, "", "success");
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
      });
  };

  const leaveRoom = async (roomId: string) => {
    await roomApi
      .leave(roomId)
      .then(() => {
        setRoomReducer(null as any);
        swal("Leave room success!!!", "", "success");
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
      });
  };

  return (
    <RoomContext.Provider
      value={{
        roomReducer,
        setRoomReducer,
        joinRoom,
        createRoom,
        getAllRoom,
        rooms,
        setRooms,
        leaveRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
