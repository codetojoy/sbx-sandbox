# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prime Checker — a single-page Play Framework 3.0.6 (Java) web app. The user enters an integer, submits it, and the server reports whether it is prime. Additional mathematical attributes are planned as future features.

## Commands

```bash
# Start the dev server (port 9000, hot-reload enabled)
sbt run

# Compile without running
sbt compile

# Run tests
sbt test

# Run a single test class
sbt "testOnly services.PrimeServiceTest"

# Open the sbt shell (faster for repeated commands)
sbt
```

`sbt` is installed at `/usr/local/sbt/bin/sbt`. Use `bash -l -c "sbt run"` if PATH is not set in the current shell.

## Architecture

The app is a standard Play Java MVC project with one controller, one service, and one view.

**Request flow:**
1. Browser loads `GET /` → `HomeController.index()` renders `index.scala.html`
2. User submits → jQuery AJAX `POST /check` with `{ value: N }` JSON body
3. `HomeController.check(Http.Request)` validates input, calls `PrimeService.isPrime(int)`
4. Returns `{ value, isPrime }` JSON; Knockout.js updates the UI

**Key files:**
- `app/services/PrimeService.java` — stateless `@Singleton`; all math logic lives here. Extend this class when adding future attributes (e.g. factor count, perfect number).
- `app/controllers/HomeController.java` — thin controller; delegates all logic to `PrimeService`. JSON in/out via `play.libs.Json`.
- `app/views/index.scala.html` — single Twirl template. jQuery and Knockout.js are served locally from `public/javascripts/` (CDN is blocked in the sandbox environment).
- `public/javascripts/app.js` — Knockout.js `PrimeViewModel`; handles client-side validation and the AJAX call.

## Routes Notes

- `POST /check` is marked `+nocsrf` because it is a JSON API endpoint. This modifier must appear on its own line immediately before the route.
- Action methods that accept `Http.Request` must be declared with `(request: Request)` in the routes file, e.g.:
  ```
  POST    /check    controllers.HomeController.check(request: Request)
  ```

## Configuration

- `APPLICATION_SECRET` env var overrides the default secret (`play.http.secret.key`).
- `play.filters.hosts.allowed = ["."]` — permits all hosts (suitable for sandbox; tighten for production).
