# EBUDDY Technical Test Solution

This monorepo contains the implementation of the EBUDDY technical test, combining both frontend and backend components.

## Prerequisites
- Node.js v20 or higher
- npm v10.8.2 or higher
- Firebase CLI
- Firebase Emulator Suite

## Project Structure
```
ebuddy/
├── apps/
│   ├── backend-repo/  # Express.js backend
│   └── frontend-repo/ # Next.js frontend
├── packages/
│   ├── shared/        # Shared types and utilities
│   ├── ui/           # Shared UI components
│   ├── eslint-config/ # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── package.json
```

## Getting Started
1. Install Firebase CLI if you haven't:
```bash
npm install -g firebase-tools
```

2. Install dependencies from the root directory:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env-example` to `.env` in both `apps/frontend-repo` and `apps/backend-repo`

## Running the Project

### Development Mode (Running Everything)
To run both frontend and backend with Firebase emulators:
```bash
npm run dev:all
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:5001
- Firebase Auth Emulator at http://localhost:9099
- Firebase Functions Emulator
- Firebase Firestore Emulator

### Running Individual Parts
Backend only:
```bash
turbo dev --filter=backend-repo
```

Frontend only:
```bash
turbo dev --filter=frontend-repo
```

## Testing the Application
1. Start the application in development mode:
```bash
npm run dev:all
```

2. In another terminal, run the seeding script:
```bash
npm run seed
```

This will create three test users:
- User 1: High activity, recent engagement
- User 2: High activity, less recent engagement
- User 3: Lower activity, less recent engagement

3. Access the frontend at http://localhost:3000

# User Ranking System Implementation (Part 4)

## Overview
This system implements an **optimized Firestore query** to rank users based on three primary criteria in descending order of importance:

1. **Total Average Weighted Ratings** (highest priority)
2. **Number of Rents**
3. **Recent Activity**

To achieve efficient querying, we have configured **Firestore composite indexes** and implemented an optimized query with pagination support.

---

## 🔧 Firestore Index Configuration
To support structured ranking, the following **composite index** is defined in `firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "USERS",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "totalAverageWeightRatings",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "numberOfRents",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "recentlyActive",
          "order": "DESCENDING"
        }
      ]
    }
  ]
}
```
## 📌 Query Implementation  
The ranking query is implemented in `apps/backend-repo/src/repository/userCollection.ts` using Firestore's `orderBy` method to respect the ranking hierarchy:

```typescript
collection
  .orderBy('totalAverageWeightRatings', 'desc')
  .orderBy('numberOfRents', 'desc')
  .orderBy('recentlyActive', 'desc');
```

## 🔄 Pagination Support  
To improve efficiency and scalability, pagination is implemented using Firestore's `startAfter` and `limit` methods:

```typescript
const fetchRankedUsers = async (
  lastDoc: FirebaseFirestore.QueryDocumentSnapshot | null, 
  limit: number
) => {
  let query = collection
    .orderBy('totalAverageWeightRatings', 'desc')
    .orderBy('numberOfRents', 'desc')
    .orderBy('recentlyActive', 'desc')
    .limit(limit);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  return await query.get();
};
```

#### Performance Considerations
- The composite index ensures efficient querying with O(log n) complexity
- Pagination implementation prevents loading unnecessary documents
- The ordering respects the priority hierarchy while maintaining query performance

## Available Scripts
- `npm run dev:all` - Run all services in development mode
- `npm run seed` - Run the seed script that provided on backend-repo
- `npm run build` - Build all applications
- `npm run lint` - Lint all applications
- `npm run format` - Format code using Prettier
- `npm run start` - Start all applications in production mode

## Project Features

### Backend (Express.js)
- Firebase SDK integration
- User management endpoints
- Authentication middleware
- Firestore database integration

### Frontend (Next.js)
- Material-UI integration
- Redux state management
- Firebase authentication
- Responsive design
- User management interface

### Shared Features
- TypeScript configurations
- ESLint configurations
- Shared types and interfaces
- Common UI components

## Testing Endpoints
You can test the API endpoints using curl or Postman:
```bash
# Fetch user data
curl -H "Authorization: Bearer test-token" http://localhost:5001/hegy-project/us-central1/api/users

# Update user data
curl -X PATCH \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: application/json" \
  -d '{"totalAverageWeightRatings": 4.5}' \
  http://localhost:5001/ebuddy-e0146/us-central1/api/users/user1
```

## Troubleshooting
1. If you encounter EADDRINUSE errors, make sure no other service is running on the required ports:
   - 3000 (Frontend)
   - 5001 (Backend)
   - 9099 (Firebase Auth)
   - 8080 (Firestore)

2. If the Firebase emulators fail to start:
```bash
firebase emulators:start --clear
```

3. To clear all emulator data:
```bash
firebase emulators:start --clear
```

## Additional Notes
- The project uses Firebase Emulators for local development
- Authentication is handled through Firebase Auth
- The frontend implements Material-UI for responsive design
- State management is handled through Redux
- API calls are abstracted in the frontend's api directory
