# Security Policy

## Supported versions

Only the latest deployed version is supported while the project is pre-1.0.

## Reporting a vulnerability

Do not publish exploit details, credentials or sensitive reproduction data in a public GitHub issue.
Use GitHub's private vulnerability reporting feature when enabled for this repository.

## Repository rules

- Never commit `.env`, credentials, private keys, API tokens, cookies or service-account files.
- `NEXT_PUBLIC_*` variables are public by definition and must never contain secrets.
- Production secrets belong in the hosting provider's encrypted environment-variable store.
- Use least-privilege credentials and separate development/preview/production values.
- Rotate any credential immediately if it is ever committed, even if the commit is later deleted.
- Treat all client-side code and network calls as public information.

## Application baseline

V0.1 intentionally has no authentication, database, payment, privileged API route or writable public form. Future server features must add validation, authorization, rate limiting, logging without sensitive payloads, CSRF/replay considerations where applicable, and abuse controls before deployment.
