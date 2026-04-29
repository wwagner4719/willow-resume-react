# SECURITY.md — Project Security Rules

**Location:** `SECURITY.md` at project root. Commit this file.

**Why this file exists:** CLAUDE.md auto-loads on every session, so it must stay short. Security specs are long and detailed but only matter when Claude touches auth, input handling, secrets, or data — so they live here, read on demand.

**When Claude must read this file:** Before writing any code that handles secrets, user input, authentication, authorization, database queries, API requests, file uploads, or external service calls.

---

## 1. Secrets Management

- **Never hardcode secrets.** API keys, tokens, passwords, connection strings, webhook URLs — all go in `.env` only.
- **Commit `.env.example`, never `.env`.** `.env` must be in `.gitignore` before the first commit.
- **Pre-commit check:** `git diff --cached | grep -iE "(key|secret|password|token|bearer)"` must return nothing.
- **If a secret is ever committed**, treat it as compromised — rotate the value at the provider before anything else. History rewrites (`git filter-branch`, BFG) do not undo exposure.
- **Never log secrets, tokens, or PII** to console, file, or any telemetry — even in development.

---

## 2. Input Validation

- **Validate every input at system boundaries**: API endpoints, form submissions, webhook handlers, message queue consumers, file uploads.
- **Never trust client-side validation alone.** Re-validate on the server for every field.
- **Use strict constraints**: min/max length, regex, type, and allowlist values where possible.
- **Reject by default.** Accept only what you explicitly recognize.

---

## 3. Authentication & Authorization

- **Verify auth on every endpoint.** No route should be accidentally public. If an endpoint has no auth check, document why inline.
- **Check resource ownership (IDOR prevention).** `GET /orders/:id` must verify the requesting user owns order `:id` — it's not enough to require a valid session.
- **Principle of least privilege.** Every service account, API key, and DB role gets only what it needs.
- **Session tokens**: HTTP-only, `Secure`, `SameSite=Lax` (or `Strict` where possible). Never store in `localStorage`.
- **Rate-limit auth endpoints**: login, signup, password reset, token refresh. Protect against credential stuffing.

---

## 4. Data Protection

- **Never log PII** (emails, names, phone numbers, tokens). Log user IDs or hashed identifiers instead.
- **Never return sensitive fields in API responses** unless explicitly needed — strip `password_hash`, internal IDs, audit metadata, etc.
- **Use parameterized queries.** Never concatenate user input into SQL, NoSQL filters, or shell commands.
- **Sanitize all user-provided data** before storage, rendering, or forwarding to another system.
- **Encrypt sensitive data at rest** when the database doesn't do it by default.

---

## 5. OWASP Top-10 Prevention (Common Vulnerabilities)

- **Injection** (SQL, NoSQL, command, LDAP): parameterized queries / prepared statements only. Never string-concatenate user input into a query or shell command.
- **XSS**: escape or sanitize any user content that renders in HTML. Use framework-native escaping (React auto-escapes, Vue `v-text`, etc.) — avoid `dangerouslySetInnerHTML` / `v-html` / raw template output.
- **CSRF**: for state-changing endpoints on cookie-auth apps, validate `Origin` / `Referer` headers or use a CSRF token.
- **Mass Assignment**: use strict schemas (Zod, Joi, Pydantic, DTOs). Never `new User(req.body)` — that lets attackers set `is_admin`.
- **SSRF**: when fetching user-provided URLs, allowlist domains and block private IP ranges (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).
- **Insecure Deserialization**: don't deserialize untrusted data. Prefer JSON over pickle/YAML-load/etc.
- **Broken Access Control**: every resource access check must verify ownership, not just authentication.
- **Security Misconfiguration**: disable debug in production. Set security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy).

---

## 6. Pre-Commit Security Checklist

Run these before every commit. If any fail, fix before committing.

```bash
# 1. Lint (catches unsafe patterns via ESLint security plugins, Bandit, etc.)
npm run lint     # or: ruff check . / golangci-lint run

# 2. Type check (catches type-confusion bugs)
npm run type-check

# 3. Tests pass
npm test

# 4. No exposed secrets in staged diff
git diff --cached | grep -iE "(api_key|secret|password|token|bearer|private_key)"

# 5. Dependency audit (catches known-vulnerable packages)
npm audit --audit-level=high    # or: pip-audit / cargo audit / trivy fs .
```

---

## 7. Incident Response — If a Secret Leaks

1. **Rotate first.** Generate a new value at the provider (Stripe, Supabase, OpenAI, etc.). Revoke the old one.
2. **Update `.env`** on every environment (local, staging, prod) with the new value.
3. **Redeploy** services that hold the secret in memory.
4. **Check logs** for unauthorized use between the leak and rotation.
5. **Remove from git history** as a defense-in-depth step (BFG Repo-Cleaner or `git filter-repo`), but treat the secret as already compromised regardless.
6. **Document the incident**: what leaked, when, how it was discovered, what was rotated. File in the project's incident log or Notion.

---

## 8. References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — most common web-app vulnerabilities
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — concrete implementation guidance
- [CWE Top 25](https://cwe.mitre.org/top25/) — most dangerous software weaknesses
- [Mozilla Observatory](https://observatory.mozilla.org/) — scan a deployed site for header / TLS issues

---

---

## 9. Project-Specific Rules — Atachy

### Sensitive Data in a Dating App

- **Photos**: Never store images in the database — store a URL reference only. Use Azure Blob Storage with SAS tokens for actual files.
- **Date of birth**: Store as a `date` column; return only the calculated **age** in API responses — never the raw date of birth.
- **Location**: If location is stored, treat it as PII. Return distance only — never exact coordinates.
- **Match privacy**: A user must never be able to query another user's swipe history or see who liked them without a mutual match existing first.
- **Discovery feed**: The query that returns candidate profiles must always exclude profiles the requesting user has already swiped (in either direction) and filter by the user's stated preferences.

### EF Core / SQL Server

- Always use EF Core LINQ queries or parameterized raw SQL — never string-interpolated SQL.
- All schema changes go through `dotnet ef migrations add` — never apply raw DDL directly to the database.
- Never expose `PasswordHash`, `DateOfBirth`, or internal FK IDs in API responses.

### JWT Security

- JWT secret must be a minimum of 32 random characters. Store in environment variables or Azure Key Vault — never in `appsettings.json` or source control.
- Validate `iss` (issuer) and `aud` (audience) claims on every token.
- Set token expiry to 1 hour maximum. Refresh tokens are out of scope for v1 — document this as a known limitation.

### Angular Frontend

- Never store JWT in `localStorage` — use HTTP-only cookies or in-memory storage only.
- Use a single Angular `HttpInterceptor` to attach the Authorization header — never append tokens manually inside components.
- Sanitize any user-generated content (bio text, display name) before rendering — rely on Angular's built-in escaping and avoid `[innerHTML]` bindings with user data.
