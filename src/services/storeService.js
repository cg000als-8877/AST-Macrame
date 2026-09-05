import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  increment
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const DEFAULT_STORE_CONFIG = {
  singlePrice: 850,
  singleRegularPrice: 1050,
  comboPrice: 1490,
  comboRegularPrice: 2100,
  deliveryCharge: 100,
  currency: 'BDT',
  inStockColors: {
    Black: true,
    Navy: true,
    Brown: true,
    Maroon: true,
    Khaki: true
  },
  inStockSizes: {
    M: true,
    L: true
  },
  announcement: "100% Handcrafted Natural Cotton Belts"
};

/**
 * Subscribe to live store configuration with instant fallback
 */
export const subscribeStoreConfig = (callback) => {
  try {
    const configDocRef = doc(db, "settings", "store_config");
    return onSnapshot(configDocRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ ...DEFAULT_STORE_CONFIG, ...docSnap.data() });
      } else {
        callback(DEFAULT_STORE_CONFIG);
      }
    }, (error) => {
      console.warn("Using offline fallback store config:", error.message);
      callback(DEFAULT_STORE_CONFIG);
    });
  } catch (e) {
    callback(DEFAULT_STORE_CONFIG);
    return () => {};
  }
};

/**
 * Update store configuration (Admin Only)
 */
export const updateStoreConfig = async (newConfig) => {
  const configDocRef = doc(db, "settings", "store_config");
  await setDoc(configDocRef, {
    ...newConfig,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Save order to Firebase Firestore (in addition to Google Sheets)
 */
export const saveOrderToFirestore = async (orderData) => {
  try {
    const ordersColRef = collection(db, "orders");
    const docRef = await addDoc(ordersColRef, {
      ...orderData,
      status: "Pending", // Pending, Confirmed, Shipped, Delivered, Cancelled
      createdAt: serverTimestamp()
    });

    // Also increment daily order analytics counter
    const today = new Date().toISOString().split("T")[0];
    const dailyAnalyticsRef = doc(db, "analytics", today);
    setDoc(dailyAnalyticsRef, {
      orderCount: increment(1),
      revenue: increment(orderData.totalCost || 0),
      lastUpdated: serverTimestamp()
    }, { merge: true }).catch(() => {});

    return docRef.id;
  } catch (err) {
    console.warn("Firestore order backup error (Sheets still active):", err);
    return null;
  }
};

/**
 * Record Page View Analytics (Anonymous Traffic Counter)
 */
export const recordTrafficVisit = async (page = "retail") => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const dailyAnalyticsRef = doc(db, "analytics", today);
    setDoc(dailyAnalyticsRef, {
      views: increment(1),
      [`views_${page}`]: increment(1),
      date: today
    }, { merge: true }).catch(() => {});
  } catch (e) {
    // Silent
  }
};

/**
 * Subscribe to live orders (Admin Only)
 */
export const subscribeOrders = (callback, maxLimit = 100) => {
  try {
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      limit(maxLimit)
    );

    return onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(orders);
    }, (err) => {
      console.error("Failed to subscribe orders:", err);
      callback([]);
    });
  } catch (e) {
    console.error("Order query error:", e);
    callback([]);
    return () => {};
  }
};

/**
 * Update Order Status (Admin Only)
 */
export const updateOrderStatus = async (docId, newStatus) => {
  const orderDocRef = doc(db, "orders", docId);
  await updateDoc(orderDocRef, {
    status: newStatus,
    updatedAt: serverTimestamp()
  });
};
