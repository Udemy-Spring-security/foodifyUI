# FoodifyUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Foodify — Social Login Implementation Guide

> Keycloak + Google + GitHub + Spring Boot + Angular

---

## Overview

Social login in Foodify is implemented using **Keycloak as an identity broker**.
Angular never talks to Google or GitHub directly — Keycloak handles the OAuth2
handshake and issues its own JWT to Angular. Spring Boot services need zero changes.

### Stack
- Angular UI — port 4200
- Restaurant Service (Spring Boot) — port 8081
- Menu Service (Spring Boot) — port 8082
- Keycloak (Docker) — port 8443, realm: `foodify`

### Architecture Flow
```
User clicks "Login with Google/GitHub"
        │
        ▼
Angular calls keycloak.login({ idpHint: 'google' })
        │
        ▼
Keycloak redirects to Google/GitHub OAuth2 consent page
        │
        ▼
User grants permission → Google/GitHub returns auth code to Keycloak
        │
        ▼
Keycloak exchanges code, creates/updates local user
        │
        ▼
Keycloak issues its OWN JWT → returned to Angular
        │
        ▼
Angular sends Keycloak JWT to Restaurant Service (unchanged)
        │
        ▼
Restaurant Service fetches M2M token → calls Menu Service (unchanged)
```

> **Key insight:** Spring Boot services always receive a Keycloak-issued JWT —
> never a Google or GitHub token. Zero backend changes needed.

---

## Prerequisites

- Keycloak running in Docker on port 8443
- `foodify` realm created in Keycloak
- `foodify_ui` client registered (public, Angular SPA)
- `restaurant_service` client registered (confidential, service accounts enabled)
- Angular app with `keycloak-angular` installed
- Google account for Google Cloud Console
- GitHub account for OAuth App registration

---

## Part 1 — Google Social Login

### Phase 1.1 — Google Cloud Console Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Navigate to **APIs & Services → Credentials**
3. Click **Create Credentials → OAuth 2.0 Client ID**
4. Set **Application type** to `Web application`
5. Set **Name** to `Foodify Keycloak`
6. Under **Authorized redirect URIs** add exactly:http://localhost:8443/realms/foodify/broker/google/endpoint
7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

> ⚠️ The redirect URI must match exactly what you enter in Keycloak.
> Any mismatch causes a `redirect_uri_mismatch` error from Google.

---

### Phase 1.2 — Keycloak Configuration for Google

1. Open `http://localhost:8443` → log in as admin
2. Select the **foodify** realm
3. Go to **Identity Providers** → **Add provider** → **Google**
4. Fill in:

| Field | Value |
|---|---|
| Client ID | `PASTE_FROM_GOOGLE_CONSOLE` |
| Client Secret | `PASTE_FROM_GOOGLE_CONSOLE` |
| Default Scopes | `openid email profile` |
| Alias | `google` (auto-filled) |

5. Verify the **Redirect URI** shown matches what you entered in Google Console
6. Click **Save**

---

## Part 2 — GitHub Social Login

### Phase 2.1 — GitHub OAuth App Setup

1. Go to `github.com` → click your avatar → **Settings**
2. Scroll to bottom of left sidebar → **Developer Settings**
3. Click **OAuth Apps → New OAuth App**
4. Fill in:

| Field | Value |
|---|---|
| Application name | `Foodify` |
| Homepage URL | `http://localhost:4200` |
| Authorization callback URL | `http://localhost:8443/realms/foodify/broker/github/endpoint` |

5. Click **Register application**
6. Copy the **Client ID**
7. Click **Generate a new client secret** → copy it immediately

> ⚠️ GitHub shows the client secret only once. Copy it before leaving the page.

---

### Phase 2.2 — Keycloak Configuration for GitHub

1. Open `http://localhost:8443` → **foodify** realm
2. Go to **Identity Providers → Add provider → GitHub**
3. Fill in:

| Field | Value |
|---|---|
| Client ID | `PASTE_FROM_GITHUB` |
| Client Secret | `PASTE_FROM_GITHUB` |
| Default Scopes | `user:email` |

> `user:email` scope is required — without it GitHub won't return the user's email.

4. Click **Save**

---

### Phase 2.3 — GitHub Attribute Mappers

GitHub profile fields need to be mapped to Keycloak user attributes.

**Email Mapper**
