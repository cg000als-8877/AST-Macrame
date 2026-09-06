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
  // Product Information
  productTitle: "AST Handmade Macramé Belt",
  productSubtitle: "Unisex Design • 100% Organic Cotton",
  shortDescription: "Fully handmade, very strong, and comfortable to wear. A belt made to last for years, even for the next generation!",
  fullDescription: "Crafted from 100% premium hand-dyed organic cotton cords, each AST Macramé belt is meticulously knotted by master artisans in Bangladesh. Fitted with anti-corrosion vintage alloy hardware for all-day comfort and lifetime durability.",
  
  // Specifications & Materials
  material: "100% Organic Cotton Cord (4.5mm)",
  buckleMaterial: "Vintage Brushed Alloy (Anti-Rust / Lead-Free)",
  dimensions: "1.4\" Width (3.5 cm) • 43\" Length (109 cm) stretch-flexible",
  careInstructions: "Spot clean with damp cloth or hand wash in cold water with mild detergent. Lay flat in shade to dry.",
  
  // Pricing Controls
  singlePrice: 850,
  singleRegularPrice: 1050,
  comboPrice: 1490,
  comboRegularPrice: 2100,
  sampleTier1Price: 850,
  sampleTier2Price: 800,
  sampleTier3Price: 750,
  sampleTier5Price: 690,
  deliveryCharge: 100,
  currency: 'BDT',

  // Stock & Inventory
  inStockColors: {
    Black: true,
    Navy: true,
    Brown: true,
    Maroon: true,
    Khaki: true
  },
  stockCounts: {
    Black: 45,
    Navy: 32,
    Brown: 28,
    Maroon: 20,
    Khaki: 35
  },
  inStockSizes: {
    M: true,
    L: true
  },

  // Store Notices
  announcement: "100% Handcrafted Natural Cotton Belts • Free Nationwide Replacement Guarantee",
  contactPhone: "+880 1940-689061",
  contactEmail: "astmacrame@gmail.com"
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
      status: orderData.status || "Pending", // Pending, Confirmed, In Production, Shipped, Delivered, Cancelled
      createdAt: serverTimestamp()
    });

    // Also increment daily order analytics counter
    const today = new Date().toISOString().split("T")[0];
    const dailyAnalyticsRef = doc(db, "analytics", today);
    setDoc(dailyAnalyticsRef, {
      orderCount: increment(1),
      revenue: increment(Number(orderData.totalCost) || 0),
      date: today,
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
export const subscribeOrders = (callback, maxLimit = 200) => {
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
 * Subscribe to traffic and daily analytics
 */
export const subscribeAnalytics = (callback, maxDays = 14) => {
  try {
    const analyticsQuery = query(
      collection(db, "analytics"),
      orderBy("date", "desc"),
      limit(maxDays)
    );

    return onSnapshot(analyticsQuery, (snapshot) => {
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(records);
    }, (err) => {
      console.warn("Failed to subscribe analytics:", err);
      callback([]);
    });
  } catch (e) {
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

/**
 * Export orders list to CSV file
 */
export const exportOrdersToCSV = (orders) => {
  if (!orders || orders.length === 0) {
    alert("No orders available to export.");
    return;
  }

  const headers = ["Order ID", "Date", "Customer Name", "Phone", "Channel", "Status", "Items", "Total (BDT)", "Address", "City", "Note"];
  
  const rows = orders.map(o => {
    const itemsStr = o.items ? o.items.map(i => `${i.name || 'Belt'} [${i.color} ${i.size}]`).join(" | ") : (o.orderType || "Sample Belt");
    return [
      `"${o.orderId || o.id}"`,
      `"${o.date || ''} ${o.time || ''}"`,
      `"${(o.name || '').replace(/"/g, '""')}"`,
      `"${o.phone || ''}"`,
      `"${o.channel || (o.formType === 'Sample' ? 'Sample Order' : 'Retail COD')}"`,
      `"${o.status || 'Pending'}"`,
      `"${itemsStr.replace(/"/g, '""')}"`,
      `"${o.totalCost || 0}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${(o.city || o.district || '').replace(/"/g, '""')}"`,
      `"${(o.note || '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `AST_Macrame_Orders_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
