import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';

interface ZeegDB extends DBSchema {
  user: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
      picture: string;
      sanitizedUsername: string;
    };
  };
  availability: {
    key: string;
    value: {
      userId: string;
      availability: Record<string, { enabled: boolean; from: string; to: string }>;
    };
  };
}

let db: IDBPDatabase<ZeegDB> | null = null;

export async function useIndexedDB() {
  if (typeof window === 'undefined') {
    return {
      saveUser: async () => {},
      getUser: async () => null,
      saveAvailability: async () => {},
      getAvailability: async () => null,
    };
  }

  if (!db) {
    db = await openDB<ZeegDB>('zeeg-demo-db', 1, {
      upgrade(db) {
        db.createObjectStore('user', { keyPath: 'id' });
        db.createObjectStore('availability', { keyPath: 'userId' });
      },
      blocked() {
        console.error("IndexedDB blocked.");
      },
      blocking() {
        console.error("IndexedDB blocking.");
      },
      terminated() {
        console.error("IndexedDB terminated.");
      },
    });
  }

  return {
    async saveUser(user: ZeegDB['user']['value']) {
      try {
        await db!.put('user', user);
        console.log("User saved successfully:", user);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    },

    async getUser(id: string) {
      try {
        const user = await db!.get('user', id);
        return user;
      } catch (error) {
        console.error("Error retrieving user:", error);
        return null;
      }
    },

    async saveAvailability(userId: string, availability: Record<string, { enabled: boolean; from: string; to: string }>) {
      try {
        
        await db!.put('availability', { userId, availability });
      } catch (error) {
        console.error("Error saving availability:", error);
      }
    },

    async getAvailability(userId: string) {
      try {
        const availability = await db!.get('availability', userId);
        return availability;
      } catch (error) {
        console.error("Error retrieving availability:", error);
        return null;
      }
    }
  };
}