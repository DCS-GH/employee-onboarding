# Power Apps Code Apps setup

This project has the Power Apps Code Apps client library installed and initialized from `src/powerApps.ts`.

## 1. Sign in and initialize the app

Run the local app in one terminal:

```bash
npm run dev
```

In another terminal, initialize the Power Apps Code App. Replace the environment ID with your target Power Platform environment.

```bash
npx power-apps init \
  --environment-id <environment-id> \
  --display-name "Employee Onboarding Portal" \
  --description "Employee onboarding portal built with React and Vite" \
  --build-path ./dist \
  --file-entry-point ./index.html \
  --app-url http://localhost:3000
```

After the project is initialized once, local Power Apps hosting can be started with:

```bash
npm run power:run
```

## 2. Add Power Platform data sources

The app currently uses sample data in `src/store.tsx` and persists changes to `localStorage`. To move this to Power Platform, create Dataverse tables for the main entities:

- Employees
- Onboarding Tasks
- Documents
- Schedule Items
- Courses
- Policies
- IT Access Items
- Support Tickets
- Notifications
- Audit Logs

Then add each table to the Code App. Example for Dataverse:

```bash
npx power-apps add-data-source \
  --environment-id <environment-id> \
  --api-id dataverse \
  --resource-name <dataverse-table-logical-name>
```

For SQL or connector-backed sources, first list your available connections:

```bash
npx power-apps list-connections --environment-id <environment-id>
```

Then add a table or resource with the connection, dataset, and resource name:

```bash
npx power-apps add-data-source \
  --environment-id <environment-id> \
  --api-id <connector-api-id> \
  --connection-id <connection-id> \
  --dataset <dataset-id> \
  --resource-name <table-or-resource-name>
```

## 3. Replace local sample persistence

Once data sources are added, the CLI generates TypeScript client files for those sources. Use those generated clients in `src/store.tsx` to load and mutate records instead of reading and writing `localStorage`.

Keep the current `initial*` seed functions as fallback/demo data while the Dataverse records are empty.

## 4. Push updates to Power Apps

Build and push the current app bundle:

```bash
npm run power:push
```

Useful docs:

- https://learn.microsoft.com/en-us/power-apps/developer/code-apps/
- https://www.npmjs.com/package/@microsoft/power-apps
