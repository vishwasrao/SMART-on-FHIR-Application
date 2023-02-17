# SMART-on-FHIR-Application
Demo Application for SMART on FHIR. This application demonstrates steps involved into SMART App Launch.
[SMART App Launch](https://build.fhir.org/ig/HL7/smart-app-launch/app-launch.html)

1. Register App with EHR (one-time step)
2. Launch App: EHR Launch
3. Retrieve .well-known/smart-configuration
4. Obtain authorization code
5. Obtain access token
6. Access FHIR API

# Frontend
Run all commands inside `frontend` directory
Install all dependencies

```
npm install
```

Run Test

```
npm run test
```

Run Linting

```
npm run lint
```

Run Dev

```
npm run dev
```

Build for Production
This will build assets into `backend/client` directory for static serve from backend.

```
npm run build
```


# Backend
Run all commands inside `backend` directory
Install all dependencies

```
npm install
```

Run Test

```
npm run test
```

Run Linting

```
npm run lint
```

Run Dev

```
npm run start:dev
```

Build for production

```
npm run build
```