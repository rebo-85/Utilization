import { HttpRequestMethod, HttpHeader, HttpRequest, http } from "@minecraft/server-net";

const ERROR_MESSAGES = {
  INVALID_PORT: "Invalid Port!",
  CONNECTION_FAILED: "Connection failed",
  COULD_NOT_CONTACT_SERVER: "Could not contact server",
  FAILED_TO_DISCONNECT: "Failed to disconnect",
  FAILED_TO_SEND_MESSAGE: "Failed to send message",
  HTTP_REQUEST_FAILED: "HTTP request failed",
  NOT_CONNECTED: "Not connected to the server",
};
const MESSAGES = {
  ...ERROR_MESSAGES,
  CONNECTED: "Connected to server.",
  DISCONNECTED: "Disconnected from server.",
  RECONNECTING: "Reconnecting to server.",
};

const defaultPort = 19132;

export class Server {
  /**
   * @description Creates a new instance of the Server class.
   */
  constructor() {
    this.IPAddress = "";
    this.Port = defaultPort;
    this.IsConnected = false;
  }

  /**
   * @description Connects to a Minecraft server specified by the IPAddress and Port.
   * @param {String} ipAddress
   * @param {Number} port
   * @returns {Promise<void>}
   */
  async connect(ipAddress, port) {
    if (port < 0 || port > 65535) throw ERROR_MESSAGES.INVALID_PORT;
    this.disconnect(MESSAGES.RECONNECTING);
    this.IPAddress = ipAddress;
    this.Port = port;

    try {
      const response = await this.sendRequest();
      if (response.status === 200) {
        this.IsConnected = true;
        console.warn(MESSAGES.CONNECTED);
      } else {
        throw ERROR_MESSAGES.CONNECTION_FAILED;
      }
    } catch (ex) {
      throw `${ERROR_MESSAGES.COULD_NOT_CONTACT_SERVER}. ERROR: ${ex}`;
    }
  }

  /**
   * @description Disconnects from the Minecraft server with an optional reason.
   * @param {String} reason
   * @returns {Promise<void>}
   */
  async disconnect(reason = null) {
    if (this.IsConnected) {
      try {
        await this.sendRequest();
        this.IsConnected = false;
        console.warn(reason || MESSAGES.DISCONNECTED);
      } catch (ex) {
        console.error(`Failed to disconnect: ${ERROR_MESSAGES.FAILED_TO_DISCONNECT}, ERROR: ${ex}`);
      }
    }
  }

  /**
   * @description Sends a request to the Minecraft server.
   * @param {String} endpoint
   * @param {Object} body
   * @returns {Promise<Object>}
   */
  async sendRequest(endpoint = "", body = {}) {
    const request = new HttpRequest(`http://${this.IPAddress}:${this.Port}/${endpoint}`);
    request.setBody(JSON.stringify(body));
    request.setMethod(HttpRequestMethod.Post);
    request.setHeaders([new HttpHeader("Content-Type", "application/json")]);

    const response = await http.request(request);

    if (response.status === 200) {
      return response;
    } else {
      throw `${ERROR_MESSAGES.HTTP_REQUEST_FAILED}, STATUS_CODE: ${response.status}`;
    }
  }
}

export class MinecraftClientServer extends Server {
  /**
   * @description Creates a new instance of the MinecraftClientServer class.
   */
  constructor() {
    super();
  }
}
