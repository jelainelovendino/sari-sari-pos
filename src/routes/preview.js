const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  const isPos = req.path === '/pos' || req.path === '/inventory';
  res.locals.currentUser = {
    fullName: isPos ? 'Demo Barista' : 'Demo Store Owner',
    role: isPos ? 'sales_rep' : 'admin',
  };
  res.locals.preview = true;
  res.locals.flash = {};
  next();
});

const products = [
  { id: 1, name: 'Barako Brew', category_name: 'Coffee', category_id: 1, unit: 'cup', cost_price: 35, selling_price: 95, stock_quantity: 50, reorder_level: 10, active: true },
  { id: 2, name: 'Spanish Latte', category_name: 'Coffee', category_id: 1, unit: 'cup', cost_price: 45, selling_price: 135, stock_quantity: 40, reorder_level: 10, active: true },
  { id: 3, name: 'Caramel Macchiato', category_name: 'Coffee', category_id: 1, unit: 'cup', cost_price: 48, selling_price: 150, stock_quantity: 4, reorder_level: 6, active: true },
  { id: 4, name: 'Butter Croissant', category_name: 'Pastries', category_id: 2, unit: 'pc', cost_price: 35, selling_price: 85, stock_quantity: 0, reorder_level: 8, active: true },
];
const categories = [{ id: 1, name: 'Coffee' }, { id: 2, name: 'Pastries' }];
const reports = [
  { product_name: 'Caramel Macchiato', type: 'damaged', quantity_change: -2, note: 'Spilled cups', reported_by: 'Demo Barista', created_at: 'Today, 9:15 AM' },
  { product_name: 'Barako Brew', type: 'restock', quantity_change: 24, note: 'Fresh coffee beans', reported_by: 'Demo Store Owner', created_at: 'Yesterday, 2:30 PM' },
];

router.get('/', (req, res) => res.redirect('/preview/dashboard'));
router.get('/dashboard', (req, res) => res.render('admin/dashboard', {
  preview: true,
  title: 'Dashboard',
  todayTotal: { total: 12450, count: 18 },
  weekTotal: { total: 68420, count: 96 },
  monthTotal: { total: 248900, count: 342 },
  trendData: [{ day: '2026-10-28', total: 8200 }, { day: '2026-10-29', total: 11400 }, { day: '2026-10-30', total: 9600 }, { day: '2026-10-31', total: 13800 }, { day: '2026-11-01', total: 10800 }, { day: '2026-11-02', total: 14600 }, { day: '2026-11-03', total: 12450 }],
  topProducts: [{ product_name: 'Barako Brew', units_sold: 86, revenue: 8170 }, { product_name: 'Spanish Latte', units_sold: 54, revenue: 7290 }, { product_name: 'Caramel Macchiato', units_sold: 38, revenue: 5700 }],
  lowStock: products.filter((p) => p.stock_quantity <= p.reorder_level),
  recentSales: [{ id: 1, receipt_no: 'SALE-00128', cashier: 'Juana Cruz', total_amount: 486, created_at: 'Today, 10:42 AM' }, { id: 2, receipt_no: 'SALE-00127', cashier: 'Mark Santos', total_amount: 220, created_at: 'Today, 10:18 AM' }],
}));
router.get('/products', (req, res) => res.render('admin/products', { preview: true, title: 'Products', products, categories }));
router.get('/sales', (req, res) => res.render('admin/sales', { preview: true, title: 'Sales Transactions', from: '', to: '', sales: [{ id: 1, receipt_no: 'SALE-00128', cashier: 'Juana Cruz', total_amount: 486, amount_paid: 500, change_amount: 14, created_at: 'Today, 10:42 AM' }, { id: 2, receipt_no: 'SALE-00127', cashier: 'Mark Santos', total_amount: 220, amount_paid: 220, change_amount: 0, created_at: 'Today, 10:18 AM' }] }));
router.get('/inventory-reports', (req, res) => res.render('admin/inventory_reports', { preview: true, title: 'Inventory Reports', reports }));
router.get('/users', (req, res) => res.render('admin/users', { preview: true, title: 'Users', users: [{ id: 1, username: 'admin', full_name: 'Store Owner', role: 'admin', active: true, created_at: 'Nov 1, 2026' }, { id: 2, username: 'cashier1', full_name: 'Juana Cruz', role: 'sales_rep', active: true, created_at: 'Nov 1, 2026' }] }));
router.get('/pos', (req, res) => res.render('pos/index', { preview: true, title: 'Point of Sale', products }));
router.get('/inventory', (req, res) => res.render('pos/inventory', { preview: true, title: 'Inventory', products, myReports: reports }));

module.exports = router;
