# Atachy

A Tinder-style dating web app — register a profile, swipe on other users, match with people who like you back, and chat with your matches.

Built with Angular (frontend) and .NET 8 Web API using Clean Architecture (backend), backed by SQL Server.

---

## Quick Start

### Prerequisites

- [Node.js v18+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/sql-server) (local instance or Azure SQL)
- [EF Core CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet): `dotnet tool install --global dotnet-ef`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/atachy.git
cd atachy

# 2. Configure the backend
cd Atachy.API
cp appsettings.Development.json.example appsettings.Development.json
# Open appsettings.Development.json and fill in:
#   - ConnectionStrings:DefaultConnection  (your SQL Server connection string)
#   - Jwt:Secret                           (random string, 32+ characters)

# 3. Create the database
dotnet ef database update

# 4. Start the API
dotnet run
# API runs at https://localhost:7000

# 5. In a new terminal, set up the frontend
cd ../client
npm install
ng serve
# App runs at http://localhost:4200
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## Available Scripts

### Frontend — run from `client/`

```bash
ng serve                # Start development server (http://localhost:4200)
ng build                # Build for production
ng test                 # Run unit tests
ng lint                 # Run linting
```

### Backend — run from `Atachy.API/`

```bash
dotnet run                              # Start the API (https://localhost:7000)
dotnet test                             # Run all tests
dotnet build                            # Build the project
dotnet ef migrations add <Name>         # Create a new EF Core migration
dotnet ef database update               # Apply pending migrations to SQL Server
```

---

## Project Structure

```
atachy/
├── client/                             # Angular frontend
│   └── src/app/
│       ├── features/
│       │   ├── auth/                   # Registration and login
│       │   ├── profile/                # View and edit own profile
│       │   ├── discovery/              # Discovery feed and swipe UI
│       │   ├── matches/                # Match list
│       │   └── chat/                   # Per-match chat thread
│       ├── core/                       # Auth guard, JWT interceptor, auth service
│       └── shared/                     # Reusable components, pipes, directives
│
├── Atachy.Domain/                      # Entities, value objects
├── Atachy.Application/                 # Use cases, DTOs, interfaces, validators
├── Atachy.Infrastructure/              # EF Core, repositories, JWT, SQL Server
└── Atachy.API/                         # Controllers, middleware, entry point
    ├── appsettings.json
    ├── appsettings.Development.json    # Local config (gitignored — never commit)
    └── Program.cs
```

---

## Environment Variables

**Backend** — set in `appsettings.Development.json` (never commit real values):

| Key | Description |
|---|---|
| `ConnectionStrings:DefaultConnection` | SQL Server connection string |
| `Jwt:Secret` | JWT signing secret — minimum 32 characters |
| `Jwt:Issuer` | Token issuer (e.g., `https://localhost:7000`) |
| `Jwt:Audience` | Token audience (e.g., `http://localhost:4200`) |

**Frontend** — set in `client/src/environments/environment.ts`:

| Key | Description |
|---|---|
| `apiUrl` | Backend API base URL (e.g., `https://localhost:7000`) |

---

## Troubleshooting

**CORS error in browser**
- Ensure the CORS policy in `Program.cs` allows `http://localhost:4200`

**Database connection failed**
- Check `ConnectionStrings:DefaultConnection` in `appsettings.Development.json`
- Verify SQL Server is running

**`dotnet ef` not found**
- Run: `dotnet tool install --global dotnet-ef`

**`ng` not found**
- Run: `npm install -g @angular/cli`

**Port already in use**
- API: change the port in `Atachy.API/Properties/launchSettings.json`
- Angular: `ng serve --port 4201`

**Migrations not applied**
- Run `dotnet ef database update` from inside the `Atachy.API/` directory

---

## License

MIT
