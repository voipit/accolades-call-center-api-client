"use strict";
/**
 * Accolades Example Connector
 * Version: 2.0.0
 */
let apiAccolades = null;
/**
 * The function starts the connector. It parses the parameters received by GET and
 * starts a WebSocket connection to the Accolades server
 */
function startConnector() {
	const info = {};
	// the connection parameters are sent to this script using GET parameters
	// ex: serverFqdn=client.voipit.ro&serverPort=14327&agentId=123456
	// the next line splits the entire GET string into "name=value" strings,
	// one for each parameter
	const urlParam = location.search.slice(1).split("&");
	for (let i = 0; i < urlParam.length; i++) {
		// each "name=value" string is split and the info object is populated
		const paramPair = urlParam[i].split("=");
		info[paramPair[0]] = paramPair[1];
	}
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	if (!window.WebSocket) {
		console.error("Your browser does not support WebSockets");
		return;
	}
	if (!info.serverFqdn || !info.serverPort || !info.agentId) {
		console.error("Missing connection parameters");
		return;
	}
	try {
		apiAccolades = new WebSocket("wss://" + info.serverFqdn + ":" + info.serverPort);
	} catch (error) {
		// web-socket error
		console.error(error);
		return;
	}
	// after the connection has been established an authentication package is sent
	// the agent id is read from the GET params
	apiAccolades.onopen = () => {
		apiAccolades.send(JSON.stringify({
			"type":"authRequest",
			"idCrm":info.agentId
		}));
	};
	apiAccolades.onerror = (error) => {
		console.error(error);
	};
	// when a message is received
	// the following function will be triggered
	apiAccolades.onmessage = (rawMessage) => {
		let message = null;
		try {
			message = JSON.parse(rawMessage.data);
		} catch (error) {
			console.error(error);
			return;
		}
		switch(message.type) {
			case "authSuccess":
				console.log("Connection established");
				// after the auth package has been received
				// request the connector configuration
				apiAccolades.send(JSON.stringify({
					"type":"configuration"
				}));
				break;
			case "authFailed":
				console.log("Authentication failed (" + message.reason + ")");
				apiAccolades.close();
				break;
			case "configuration":
				console.log("Account (" + JSON.stringify(message.account) + ")");
				console.log("Phone (" + JSON.stringify(message.phone) + ")");
				console.log("Agent (" + JSON.stringify(message.agent) + ")");
				break;
			case "connectionClosed":
				console.log("Connection closed");
				break;
			case "incomingCall":
				console.log("Incoming call from " + message.phoneNumber);
				break;
			case "outgoingCall":
				console.log("Outgoing call from " + message.phoneNumber);
				break;
			case "error":
				console.error("Error");
				break;
			default:
				// this message will be ignored
		}
	}
}
document.addEventListener("DOMContentLoaded", startConnector);
