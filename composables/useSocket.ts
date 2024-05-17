import io from "socket.io-client";
export default function useSocket() {
  function connectToNamespace(namespace: string, query?: object) {
    return io(`/${namespace}`, {
      transportOptions: ["websocket"],
      query,
    });
  }

  return {
    connectToNamespace,
  };
}
