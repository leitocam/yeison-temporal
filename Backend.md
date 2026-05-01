# Yeison Panel Backend

FastAPI backend for the Yeison dashboard. This document is updated to match the current codebase and is intended as a contract reference for frontend integration.

## Stack

- Python 3.11
- FastAPI
- SQLAlchemy (async) + asyncpg
- PostgreSQL
- JWT authentication (OAuth2 password flow)
- Optional Google OAuth login
- Optional chatbot with OpenAI + PydanticAI

## Base URLs

- API base: `http://localhost:8070`
- Versioned API: `http://localhost:8070/api/v1`
- Swagger: `http://localhost:8070/docs`
- ReDoc: `http://localhost:8070/redoc`
- Health: `http://localhost:8070/health`

## Quick Start

### 1) Install

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2) Configure environment

```bash
cp .env.example .env
```

Minimum required values in `.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/yeison_db
SECRET_KEY=replace-with-random-secret
```

Generate a secret key:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3) Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8070
```

## Environment Variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `DATABASE_URL` | Yes | - | Async SQLAlchemy URL |
| `SECRET_KEY` | Yes | - | JWT signing key |
| `ALGORITHM` | No | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `30` | JWT expiration |
| `ALLOWED_ORIGINS` | No | `http://localhost:3000` | Comma-separated CORS origins |
| `FRONTEND_URL` | No | `http://localhost:3000` | OAuth callback redirect target |
| `GOOGLE_CLIENT_ID` | No | empty | Enables Google OAuth when set with secret |
| `GOOGLE_CLIENT_SECRET` | No | empty | Enables Google OAuth when set with client id |
| `GOOGLE_REDIRECT_URI` | No | `http://localhost:8070/api/v1/auth/google/callback` | OAuth callback URL |
| `OPENAI_API_KEY` | No | empty | Enables AI chatbot responses |
| `DEBUG` | No | `False` | SQLAlchemy/FastAPI debug behavior |

## Authentication

All protected endpoints require:

```http
Authorization: Bearer <access_token>
```

### Login flow (email/password)

- `POST /api/v1/auth/register` (JSON body)
- `POST /api/v1/auth/login` (`application/x-www-form-urlencoded`)

`/auth/login` returns:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

### Google OAuth

- `GET /api/v1/auth/google` starts OAuth flow
- `GET /api/v1/auth/google/callback` handles provider callback
- On success, backend redirects to:
  - `${FRONTEND_URL}/auth/google/callback?token=<jwt>`
- On error, backend redirects to:
  - `${FRONTEND_URL}/login?error=<message>`

## Mounted API Routes (current)

These routers are currently mounted in `main.py`.

### 1) Auth (`/api/v1/auth`)

- `POST /register`
- `POST /login`
- `GET /google`
- `GET /google/callback`

### 2) Tenant (`/api/v1/tenants`)

- `GET /me`
- `PUT /me`

### 3) Leads (`/api/v1/leads`)

- `POST /`
- `GET /` (query: `status`, `skip`, `limit`)
- `GET /stats`
- `GET /{lead_id}`
- `PUT /{lead_id}`
- `DELETE /{lead_id}`

### 4) Inventory (`/api/v1/inventory`)

- `POST /`
- `GET /` (query: `search`, `skip`, `limit`)
- `GET /low-stock` (query: `threshold`, default `10`)
- `GET /{item_id}`
- `PUT /{item_id}`
- `POST /{item_id}/adjust` (query required: `adjustment`)
- `DELETE /{item_id}`

### 5) Agent Instances (`/api/v1/agents`)

- `POST /`
- `GET /` (query: `skip`, `limit`)
- `GET /{agent_id}`
- `PUT /{agent_id}`
- `DELETE /{agent_id}`
- `GET /{agent_id}/configuration`
- `PUT /{agent_id}/configuration` (full replace)
- `PATCH /{agent_id}/configuration` (partial deep merge)

Phone validation for agent creation uses E.164 format (example: `+584121234567`).

### 6) Sales Conversations (`/api/v1/conversations`)

- `POST /`
- `GET /` (filters: `agent_instance_id` OR `lead_id` OR `external_user_id`; if none provided returns empty list)
- `GET /{conversation_id}`
- `PUT /{conversation_id}`
- `POST /{conversation_id}/messages`
- `DELETE /{conversation_id}`
- `GET /agent/{agent_instance_id}/count`

`external_user_id` uses E.164 format.

### 7) Tenant Configuration (`/api/v1/configurations`)

- `POST /`
- `GET /current`
- `GET /current-or-create`
- `GET /{configuration_id}`
- `PUT /{configuration_id}`
- `PATCH /{configuration_id}/section` (query: `section` = `business|contact|products|operations`)
- `POST /{configuration_id}/complete`
- `POST /{configuration_id}/incomplete`
- `DELETE /{configuration_id}`

### 8) Chatbot (`/api/v1/chatbot`)

- `POST /message`
- `GET /history/{session_id}`
- `GET /conversations` (query: `skip`, `limit`)
- `DELETE /conversations/{session_id}`

If `OPENAI_API_KEY` is not configured, chatbot endpoint still works but returns a fallback informational response instead of AI output.

### 9) Dashboard (`/api/v1/dashboard`)

- `GET /metrics`
- `GET /metrics/leads-today`
- `GET /metrics/active-conversations`
- `GET /metrics/pipeline-value`
- `GET /metrics/closed-sales-today`
- `GET /metrics/sales-value-today`
- `GET /metrics/qualified-leads-today`

`GET /metrics` response keys:

- `leads_entrantes_hoy`
- `conversaciones_activas`
- `valor_pipeline`
- `ventas_cerradas_hoy`
- `valor_ventas_hoy`
- `leads_calificados_hoy`

Each key maps to:

```json
{
  "value": 0,
  "percentage_change": 0.0,
  "comparison": "vs yesterday"
}
```

## Important Frontend Notes

1. All routes except auth and health are JWT-protected.
2. Most resource deletions are soft deletes (`active=false`).
3. Tenant isolation is enforced server-side by token (`tenant_id`).
4. CORS is controlled by `ALLOWED_ORIGINS` (comma-separated).
5. Conversations list endpoint requires at least one filter; otherwise it returns `[]`.

## Not Mounted (exists in code, not exposed)

There is a sales router module (`app/api/v1/sales.py`) but it is **not currently included** in `main.py`. Therefore `/api/v1/sales/*` endpoints are not active unless the app router registration is added.

## Docker

Build and run:

```bash
docker build -t yeison_panel_backend .
docker run -d \
  --name yeison_panel_backend \
  -p 8070:8070 \
  -e DATABASE_URL="postgresql+asyncpg://postgres:password@host.docker.internal:5432/yeison_db" \
  -e SECRET_KEY="<secret>" \
  --add-host=host.docker.internal:host-gateway \
  yeison_panel_backend
```

Or use the helper script:

```bash
bash ./docker-run.sh
```