# 🧱 Project Architecture

This project follows a domain-driven + headless CMS hybrid architecture.

## Root Structure

- app/- - - - - - - - # Next.js App Router (UI + routing)
  - (admin)/- - - - - # Sanity Studio
  - (site)/
    - (public)/
    - (user)/

- domain/ - - - - - - # CORE DOMAIN LAYER
  - region/
  - stage/
  - route/
  - poi/
  - ...

- sanity/ - - - - - - # SANITY INFRASTRUCTURE
  - lib/
  - schemaTypes/
  - client.ts
  - live.ts

- content/- - - - - - # STATIC / MOCK CONTENT
  - pelegrinatges/
  - agenda/
  - home/
  - ...

- components/ - - - - # UI components
- lib/- - - - - - - - # shared utils

## Data Flow

Sanity / Local
→ sanity/ or content/
→ domain/
→ app/
→ components/

## Switching source

Inside domain service:
DATA_SOURCE = 'sanity' | 'local'
