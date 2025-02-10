"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const firebase_functions_1 = require("firebase-functions");
class UserRepository {
    constructor() {
        this.collection = firebaseConfig_1.db.collection('USERS');
    }
    async getAllUsers(pageSize = 10, lastDoc) {
        try {
            const countSnapshot = await this.collection.count().get();
            const total = countSnapshot.data().count;
            let query = this.collection
                .orderBy('totalAverageWeightRatings', 'desc')
                .orderBy('numberOfRents', 'desc')
                .orderBy('recentlyActive', 'desc')
                .limit(pageSize);
            if (lastDoc) {
                const lastDocRef = await this.collection.doc(lastDoc).get();
                if (lastDocRef.exists) {
                    query = query.startAfter(lastDocRef);
                }
            }
            const snapshot = await query.get();
            const users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            const lastVisible = snapshot.docs.length > 0 ?
                snapshot.docs[snapshot.docs.length - 1].id :
                null;
            return {
                users,
                lastDoc: lastVisible,
                total
            };
        }
        catch (error) {
            firebase_functions_1.logger.error('Error fetching users:', error);
            throw error;
        }
    }
    async getUser(userId) {
        try {
            const doc = await this.collection.doc(userId).get();
            if (!doc.exists)
                return null;
            return { id: doc.id, ...doc.data() };
        }
        catch (error) {
            firebase_functions_1.logger.error('Error fetching user:', error);
            throw error;
        }
    }
    async updateUser({ userId, data }) {
        try {
            await this.collection.doc(userId).update(data);
            const updated = await this.getUser(userId);
            if (!updated)
                throw new Error('User not found after update');
            return updated;
        }
        catch (error) {
            firebase_functions_1.logger.error('Error updating user:', error);
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userCollection.js.map