# Architecture

## Overview

This project is a client-side Vite React application. It renders a single React tree into `#root` from `index.html`.

## Application Flow

1. Vite serves `index.html`.
2. `src/main.tsx` mounts React into `#root`.
3. `src/App.tsx` renders the portfolio intro section.
4. `src/index.css` applies global styles.
5. `src/App.css` applies component-level page styling.

## Styling

The current styling uses plain CSS imported from TypeScript entry points. Font Awesome icons render as inline SVGs through `@fortawesome/react-fontawesome`.

## Data Model

No data model exists yet. Portfolio content is currently hardcoded in `src/App.tsx`.

## API Surface

No API routes or backend services exist.

## Authentication

No authentication exists or is required.

## Deployment

The app builds to static files in `dist/` and can be deployed to any static hosting provider.
