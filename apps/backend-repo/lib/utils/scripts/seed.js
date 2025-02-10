"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
console.log('Starting seed process...');
console.log('Setting up emulator connection...');
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
console.log('FIRESTORE_EMULATOR_HOST:', process.env.FIRESTORE_EMULATOR_HOST);
console.log('Initializing Firebase app...');
const app = admin.initializeApp({
    projectId: 'hegy-project'
});
const db = admin.firestore(app);
async function seedUsers() {
    try {
        const users = [
            {
                id: 'user1',
                totalAverageWeightRatings: 4.3,
                numberOfRents: 30,
                recentlyActive: 1738938812
            },
            {
                id: 'user2',
                totalAverageWeightRatings: 4.3,
                numberOfRents: 30,
                recentlyActive: 1738679612
            },
            {
                id: 'user3',
                totalAverageWeightRatings: 4.3,
                numberOfRents: 28,
                recentlyActive: 1738679612
            }
        ];
        console.log('Starting to seed users...');
        console.log('Connected to Firestore at:', process.env.FIRESTORE_EMULATOR_HOST);
        const beforeSnapshot = await db.collection('USERS').get();
        console.log('Current users in database:', beforeSnapshot.size);
        const batch = db.batch();
        for (const user of users) {
            const { id, ...userData } = user;
            console.log(`Preparing user ${id} with data:`, userData);
            const docRef = db.collection('USERS').doc(id);
            batch.set(docRef, userData);
        }
        console.log('Committing batch write...');
        await batch.commit();
        console.log('Verifying seeded data...');
        const afterSnapshot = await db.collection('USERS').get();
        console.log(`Total users after seeding: ${afterSnapshot.size}`);
        afterSnapshot.forEach(doc => {
            console.log('Seeded document:', doc.id, doc.data());
        });
    }
    catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
    finally {
        console.log('Seed process completed.');
        setTimeout(() => process.exit(0), 1000);
    }
}
seedUsers().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map