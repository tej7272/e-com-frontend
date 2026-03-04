# E-Commerce CRM — Complete Project Structure

---

## User Roles

| Role | Access | Login |
|---|---|---|
| Admin (Store Owner) | Full portal — orders, customers, products, reports, config | `/admin/login` |
| Customer | Own orders, tickets, invoices, profile | `/login` |

---

## Frontend Routes

### Public
```
/login                        ← customer login
/signup                       ← customer signup
/admin/login                  ← store owner login

/unauthorized                 ← 403 page
/not-found                    ← 404 page
```

### Admin Portal — `/admin/*`
```
/admin/dashboard

/admin/orders
/admin/orders/:id

/admin/customers
/admin/customers/:id

/admin/products
/admin/products/:id

/admin/inventory

/admin/tickets
/admin/tickets/:id

/admin/invoices
/admin/invoices/:id

/admin/promotions

/admin/reports/sales
/admin/reports/revenue
/admin/reports/customers

/admin/staff

/admin/configuration/categories
/admin/configuration/tags
/admin/configuration/settings
```

### Customer Portal — `/account/*`
```
/account/dashboard
/account/orders
/account/orders/:id
/account/tickets
/account/tickets/new
/account/tickets/:id
/account/invoices
/account/invoices/:id
/account/wishlist
/account/profile
```

---

## Frontend Folder Structure

```
src/
│
├── routes/
│   ├── index.jsx                    ← root router, combines all routes
│   ├── AdminRoutes.jsx              ← role=admin guard → /admin/login
│   └── CustomerRoutes.jsx           ← role=customer guard → /login
│
├── layouts/
│   ├── AdminLayout.jsx              ← sidebar + topbar for admin
│   ├── CustomerLayout.jsx           ← navbar + footer for customer
│   └── AuthLayout.jsx               ← centered layout for login/signup
│
├── pages/
│   ├── auth/
│   │   ├── AdminLogin.jsx
│   │   ├── CustomerLogin.jsx
│   │   └── CustomerSignup.jsx
│   │
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── DashboardView.jsx    ← stats, charts, recent orders
│   │   │
│   │   ├── orders/
│   │   │   ├── OrderListView.jsx
│   │   │   └── OrderDetailView.jsx  ← status update, timeline, invoice
│   │   │
│   │   ├── customers/
│   │   │   ├── CustomerListView.jsx
│   │   │   └── CustomerDetailView.jsx ← orders, tickets, activity
│   │   │
│   │   ├── products/
│   │   │   ├── ProductListView.jsx
│   │   │   └── ProductDetailView.jsx
│   │   │
│   │   ├── inventory/
│   │   │   └── InventoryView.jsx    ← stock levels, low stock alerts
│   │   │
│   │   ├── tickets/
│   │   │   ├── TicketListView.jsx
│   │   │   └── TicketDetailView.jsx ← messages, status, assign staff
│   │   │
│   │   ├── invoices/
│   │   │   ├── InvoiceListView.jsx
│   │   │   └── InvoiceDetailView.jsx ← PDF preview, payment status
│   │   │
│   │   ├── promotions/
│   │   │   └── PromotionView.jsx    ← coupons, discounts
│   │   │
│   │   ├── reports/
│   │   │   ├── SalesReportView.jsx
│   │   │   ├── RevenueReportView.jsx
│   │   │   └── CustomerReportView.jsx
│   │   │
│   │   ├── staff/
│   │   │   └── StaffView.jsx        ← manage staff accounts
│   │   │
│   │   └── configuration/
│   │       ├── category/
│   │       │   ├── CategoryView.jsx         ← ✅ already built
│   │       │   └── Add-update-modal.jsx
│   │       ├── tags/
│   │       └── settings/
│   │
│   └── customer/
│       ├── dashboard/
│       │   └── DashboardView.jsx    ← recent orders, quick actions
│       ├── orders/
│       │   ├── OrderListView.jsx
│       │   └── OrderDetailView.jsx  ← tracking timeline
│       ├── tickets/
│       │   ├── TicketListView.jsx
│       │   ├── NewTicketView.jsx
│       │   └── TicketDetailView.jsx
│       ├── invoices/
│       │   └── InvoiceListView.jsx
│       ├── wishlist/
│       │   └── WishlistView.jsx
│       └── profile/
│           └── ProfileView.jsx      ← address, password, preferences
│
├── components/
│   ├── base/
│   │   ├── Iconify.jsx              ← ✅ already built
│   │   └── Label.jsx                ← ✅ already built
│   │
│   ├── custom-popover/
│   │   ├── CustomPopover.jsx        ← ✅ already built
│   │   └── usePopover.js            ← ✅ already built
│   │
│   ├── confirm-dialog/
│   │   └── ConfirmDialog.jsx        ← ✅ already built
│   │
│   ├── searchBox/
│   │   └── SearchBox.jsx            ← ✅ already built
│   │
│   ├── table/
│   │   └── DataTable.jsx            ← reusable DataGrid wrapper
│   │
│   ├── form/
│   │   ├── FormikTextField.jsx      ← formik + MUI TextField
│   │   ├── FormikSelect.jsx         ← formik + MUI Select
│   │   └── FormikSwitch.jsx         ← formik + MUI Switch
│   │
│   └── charts/
│       ├── BarChart.jsx
│       ├── LineChart.jsx
│       └── PieChart.jsx
│
├── redux/
│   ├── store.js
│   │
│   ├── auth/
│   │   └── authSlice.js             ← login, logout, token, user info
│   │
│   ├── admin/
│   │   ├── orderSlice.js
│   │   ├── customerSlice.js
│   │   ├── productSlice.js
│   │   ├── inventorySlice.js
│   │   ├── ticketSlice.js
│   │   ├── invoiceSlice.js
│   │   ├── promotionSlice.js
│   │   ├── staffSlice.js
│   │   └── configuration/
│   │       ├── categorySlice.js     ← ✅ already built
│   │       ├── tagSlice.js
│   │       └── settingsSlice.js
│   │
│   └── customer/
│       ├── orderSlice.js            ← customer's own orders only
│       ├── ticketSlice.js
│       ├── invoiceSlice.js
│       ├── wishlistSlice.js
│       └── profileSlice.js
│
├── validators/
│   ├── auth.validator.js
│   ├── order.validator.js
│   ├── product.validator.js
│   ├── customer.validator.js
│   ├── ticket.validator.js
│   ├── promotion.validator.js
│   └── configuration/
│       └── category.validator.js    ← ✅ already built
│
├── utils/
│   ├── api-endpoints.js             ← ✅ already built
│   ├── sliceHelpers.js              ← ✅ already built (handlePending, handleRejected)
│   ├── formatters.js                ← date, currency, status formatters
│   └── constants.js                 ← ORDER_STATUS, TICKET_STATUS enums etc.
│
└── theme/
    ├── index.js                     ← createTheme
    └── overrides/
        ├── Popover.js               ← ✅ already built
        ├── Button.js
        ├── DataGrid.js
        └── Typography.js
```

---

## Backend Folder Structure

```
src/
│
├── routes/
│   ├── index.js                     ← mounts all routers
│   ├── auth.routes.js               ← /auth/login, /auth/signup
│   ├── admin/
│   │   ├── auth.routes.js           ← /admin/auth/login
│   │   ├── order.routes.js
│   │   ├── customer.routes.js
│   │   ├── product.routes.js
│   │   ├── inventory.routes.js
│   │   ├── ticket.routes.js
│   │   ├── invoice.routes.js
│   │   ├── promotion.routes.js
│   │   ├── staff.routes.js
│   │   └── configuration/
│   │       ├── category.routes.js   ← ✅ already built
│   │       └── tag.routes.js
│   └── customer/
│       ├── order.routes.js
│       ├── ticket.routes.js
│       ├── invoice.routes.js
│       └── profile.routes.js
│
├── controllers/
│   ├── auth/
│   │   ├── adminAuth.controller.js
│   │   └── customerAuth.controller.js
│   ├── admin/
│   │   ├── order.controller.js
│   │   ├── customer.controller.js
│   │   ├── product.controller.js
│   │   ├── inventory.controller.js
│   │   ├── ticket.controller.js
│   │   ├── invoice.controller.js
│   │   ├── promotion.controller.js
│   │   └── configuration/
│   │       └── category.controller.js ← ✅ already built
│   └── customer/
│       ├── order.controller.js
│       ├── ticket.controller.js
│       └── profile.controller.js
│
├── models/
│   ├── Admin.model.js               ← store owners, staff
│   ├── Customer.model.js            ← registered customers
│   ├── Product.model.js
│   ├── Order.model.js               ← linked to Customer + Products
│   ├── OrderItem.model.js           ← each product line in an order
│   ├── Inventory.model.js           ← stock per product
│   ├── Ticket.model.js              ← support tickets
│   ├── TicketMessage.model.js       ← messages inside a ticket
│   ├── Invoice.model.js             ← auto-generated per order
│   ├── Promotion.model.js           ← coupons, discounts
│   ├── Wishlist.model.js
│   ├── ActivityLog.model.js         ← every action tracked
│   └── configuration/
│       ├── Category.model.js        ← ✅ already built
│       └── Tag.model.js
│
├── middlewares/
│   ├── auth.middleware.js           ← verifyToken
│   ├── role.middleware.js           ← isAdmin, isCustomer
│   ├── validate.middleware.js       ← ✅ already built (validate, validateQuery)
│   ├── asyncHandler.js
│   └── errorHandler.js             ← ✅ already built
│
├── validators/
│   ├── auth.validator.js
│   ├── order.validator.js
│   ├── product.validator.js
│   └── configuration/
│       └── category.validator.js   ← ✅ already built
│
└── utils/
    ├── generateToken.js             ← JWT sign
    ├── generateInvoice.js           ← PDF invoice generation
    └── sendEmail.js                 ← order confirm, ticket updates
```

---

## Database Collections

```
Admins
├── name, email, password (hashed)
├── role: superadmin | staff
└── isActive

Customers
├── name, email, password (hashed)
├── phone, addresses[]
└── isActive

Products
├── name, description, price
├── category → Categories
├── images[]
└── isActive

Inventory
├── product → Products
├── stock (number)
└── lowStockThreshold

Orders
├── customer → Customers
├── items[] → OrderItems
├── status: pending | confirmed | shipped | delivered | cancelled
├── totalAmount, discount, finalAmount
├── invoice → Invoices
└── timeline[]              ← status change history

OrderItems
├── order → Orders
├── product → Products
├── quantity, price, discount
└── total

Invoices
├── order → Orders
├── customer → Customers
├── items[], amounts
├── status: unpaid | paid | overdue
└── pdfUrl

Tickets
├── customer → Customers
├── subject, status: open | in-progress | resolved | closed
├── priority: low | medium | high
└── assignedTo → Admins

TicketMessages
├── ticket → Tickets
├── sender → Admin or Customer
├── message, attachments[]
└── createdAt

Promotions
├── code (unique)
├── type: flat | percent
├── value, minOrderAmount
├── expiresAt, usageLimit
└── isActive

Wishlist
├── customer → Customers
└── products[] → Products

ActivityLog
├── user → Admin or Customer
├── action (string)           ← "updated category", "deleted product"
├── module                    ← "configuration", "orders"
├── reference (id)
└── createdAt

Configuration/
├── Categories                ← ✅ already built
└── Tags
```

---

## Auth Flow

```
Admin Login
POST /admin/auth/login
→ checks Admins collection
→ returns JWT (admin secret)
→ role: superadmin | staff

Customer Login
POST /auth/login
→ checks Customers collection
→ returns JWT (customer secret)

Customer Signup
POST /auth/signup
→ creates Customer
→ returns JWT
```

---

## Status Enums (constants.js)

```javascript
export const ORDER_STATUS = {
    PENDING:   'pending',
    CONFIRMED: 'confirmed',
    SHIPPED:   'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
};

export const TICKET_STATUS = {
    OPEN:        'open',
    IN_PROGRESS: 'in-progress',
    RESOLVED:    'resolved',
    CLOSED:      'closed'
};

export const TICKET_PRIORITY = {
    LOW:    'low',
    MEDIUM: 'medium',
    HIGH:   'high'
};

export const PROMOTION_TYPE = {
    FLAT:    'flat',
    PERCENT: 'percent'
};

export const INVOICE_STATUS = {
    UNPAID:  'unpaid',
    PAID:    'paid',
    OVERDUE: 'overdue'
};
```

---

## What's Already Built ✅

| File | Status |
|---|---|
| `CategoryView.jsx` | ✅ Done |
| `categorySlice.js` | ✅ Done |
| `category.validator.js` | ✅ Done |
| `category.routes.js` | ✅ Done |
| `category.controller.js` | ✅ Done |
| `validate.middleware.js` | ✅ Done |
| `errorHandler.js` | ✅ Done |
| `sliceHelpers.js` | ✅ Done |
| `CustomPopover.jsx` | ✅ Done |
| `usePopover.js` | ✅ Done |
| `ConfirmDialog.jsx` | ✅ Done |
| `theme/overrides/Popover.js` | ✅ Done |

---

*Build order recommendation: Auth → Configuration → Products → Orders → Customers → Tickets → Invoices → Reports*
