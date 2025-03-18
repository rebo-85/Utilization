import { MinecraftClientServer } from "./MinecraftClientServer";

const server = new MinecraftClientServer();
const IPAddress = "25.25.152.154";
const Port = 3000;

await server.connect(IPAddress, Port);

server.sendCommand("say Hello, world!");
