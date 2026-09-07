import React from 'react';
import { AdminProvider, useAdmin } from '../admin/context/AdminContext';
import { AdminLayout } from '../admin/components/layout/AdminLayout';

// Modules
import { DashboardModule } from '../admin/modules/dashboard/DashboardModule';
import { OrdersModule } from '../admin/modules/orders/OrdersModule';
import { ProductsModule } from '../admin/modules/products/ProductsModule';
import { InventoryModule } from '../admin/modules/inventory/InventoryModule';
import { ProductionModule } from '../admin/modules/production/ProductionModule';
import { CustomersModule } from '../admin/modules/customers/CustomersModule';
import { WholesaleModule } from '../admin/modules/wholesale/WholesaleModule';
import { ShippingModule } from '../admin/modules/shipping/ShippingModule';
import { FinanceModule } from '../admin/modules/finance/FinanceModule';
import { AnalyticsModule } from '../admin/modules/analytics/AnalyticsModule';
import { WebsiteModule } from '../admin/modules/website/WebsiteModule';
import { SettingsModule } from '../admin/modules/settings/SettingsModule';

const AdminContent = () => {
  const { activeModule } = useAdmin();

  switch (activeModule) {
    case 'dashboard':
      return <DashboardModule />;
    case 'orders':
      return <OrdersModule />;
    case 'products':
      return <ProductsModule />;
    case 'inventory':
      return <InventoryModule />;
    case 'production':
      return <ProductionModule />;
    case 'customers':
      return <CustomersModule />;
    case 'wholesale':
      return <WholesaleModule />;
    case 'shipping':
      return <ShippingModule />;
    case 'finance':
      return <FinanceModule />;
    case 'analytics':
      return <AnalyticsModule />;
    case 'website':
      return <WebsiteModule />;
    case 'settings':
      return <SettingsModule />;
    default:
      return <DashboardModule />;
  }
};

const AdminDashboard = () => {
  return (
    <AdminProvider>
      <AdminLayout>
        <AdminContent />
      </AdminLayout>
    </AdminProvider>
  );
};

export default AdminDashboard;