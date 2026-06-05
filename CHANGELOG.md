# Changelog

All notable changes to this project will be documented in this file.

The file format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-06-05

### Changed

* Split the connector into separate `index.html` and `connector.js` files.
* Updated deployment process to use a ZIP archive containing the connector files.
* Replaced the `body onload` handler with `DOMContentLoaded`.
* Improved parameter validation for connection settings.
* Updated project documentation and usage examples.

### Added

* Project documentation (`README.md`).
* JavaScript linting support using ESLint.
* HTML validation using html-validate.
* JSON parsing error handling for incoming WebSocket messages.
* Automated validation workflow using GitHub Actions.

### Fixed

* Improved handling of invalid or missing connection parameters.
* Improved handling of malformed WebSocket messages.
