# Changelog

## 1.1.0 (2026-10-15)

- Officially support NestJS 11: `@nestjs/common` and `@nestjs/core` peer ranges are now `^10.4.20 || ^11.0.0`, and `reflect-metadata` accepts `^0.1.12 || ^0.2.0`.
- Stop using the deprecated `MetadataScanner.scanFromPrototype` when exploring controllers.
  The explorer now walks `getAllMethodNames` and drops excluded endpoints itself, so the package keeps working once NestJS removes the old method.
- Development dependencies bumped to NestJS 11.2.7 and `reflect-metadata` 0.2.2.
  Tests run against NestJS 11.

## 1.0.3

- Dependency updates.
