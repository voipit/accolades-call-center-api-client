# Accolades Example Connector

![Validate](https://github.com/voipit/accolades-call-center-api-client/actions/workflows/validate.yml/badge.svg)

The Accolades Example Connector is a minimal custom connector that demonstrates how to integrate a browser-based application with Accolades.

The connector establishes a WebSocket connection to Accolades, authenticates using the provided agent identifier, receives call events, and outputs the received information to the browser console.

It is intended as a starting point for developers creating custom Accolades integrations.

## Features

* WebSocket connection to Accolades.
* Authentication using the Accolades API.
* Retrieval of connector configuration.
* Support for incoming call events.
* Support for outgoing call events.
* Example handling for common Accolades messages.
* Minimal implementation suitable as a starting point for custom connectors.

## Requirements

* An active Accolades account.
* Administrative access to upload custom connectors.
* A modern web browser with WebSocket support.

## Deployment

This connector consists of two files.

Before uploading the connector to Accolades:

1. Download the ZIP archive from the latest GitHub release, or create a ZIP archive containing the two connector files: `index.html` and `connector.js`.
2. Upload the ZIP archive through the Accolades administration interface.

Accolades automatically extracts the archive and loads the connector.

## Connector Files

| File           | Description                                         |
| -------------- | --------------------------------------------------- |
| `index.html`   | Connector entry point.                              |
| `connector.js` | Connector implementation and API integration logic. |

## Using This Connector

The connector included in this repository is fully functional.

The following functionality is already implemented and can typically be used without modification:

* WebSocket connection to Accolades.
* Authentication with the Accolades server.
* Retrieval of connector configuration.
* Reception and parsing of Accolades messages.
* Handling of connection lifecycle events.

**In most cases, developers only need to replace the example `console.log()` statements with their own business logic.**

For example:

```javascript
case "incomingCall":
	console.log("Incoming call from " + message.phoneNumber);
	break;
```

The WebSocket connection, authentication, and message handling logic can typically be left unchanged.

The default implementation writes information to the browser console and is intended as an example only.

## Supported Message Types

| Message Type       | Description                            |
| ------------------ | -------------------------------------- |
| `authSuccess`      | Authentication completed successfully. |
| `authFailed`       | Authentication failed.                 |
| `configuration`    | Account, phone, and agent configuration data. |
| `incomingCall`     | Incoming call event.                   |
| `outgoingCall`     | Outgoing call event.                   |
| `connectionClosed` | Connection has been closed.            |
| `error`            | Generic error event.                   |

## Example Output

When an incoming call is received:

```text
Incoming call from 0712345678
```

When an outgoing call is initiated:

```text
Outgoing call from 0712345678
```

## Contributing

Issues and pull requests are welcome.

Before submitting changes, please ensure that all validation checks pass successfully.

## License

Licensed under the [Apache License 2.0](LICENSE).
