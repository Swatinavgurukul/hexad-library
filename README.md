# Hexad Library - Frontend Assignment

A library management system built with React and TypeScript that allows users to borrow and return books, with admin capabilities for inventory management.

## 📋 Assignment Requirements Status

### ✅ Completed Features

#### 1. Book Borrowing & Returning
- ✅ Users can borrow books
- ✅ Users can return borrowed books
- ✅ Display "0" or "Out of Stock" when no books available (never shows negative stock)
- ✅ **DONE:** Limit users to borrow max 2 books at a time (with UI indicator)

#### 2. Admin Privileges
- ✅ Admin can add books
- ✅ Admin can view inventory
- ✅ Admin can monitor stock levels
- ✅ **DONE:** Track who has borrowed which books with complete history
- ✅ **DONE:** Track return status and overdue books
- ✅ Admin has all user functionalities

#### 3. User Experience (UI/UX)
- ✅ User-friendly interface with clear design
- ✅ Intuitive book borrowing and returning process
- ✅ Clear indicators for stock availability (color-coded, out of stock badges)
- ✅ Disabled buttons when stock is 0
- ✅ Borrow limit indicator (X/2 books)
- ✅ Navigation system with role-based menus

#### 4. Authentication & Authorization
- ✅ Auth context with login/logout
- ✅ Support for two roles: USER & ADMIN
- ✅ Mock user roles with role-based access
- ✅ Protected routes by role
- ✅ **DONE:** Routing system with React Router
- ⚠️ **DOCUMENTED:** Third-party authentication (see AUTHENTICATION_SETUP.md)
- ⚠️ **GUIDED:** Token security implementation guide provided

#### 5. Backend Mocking
- ✅ Mocked backend service (mockApi.ts)
- ✅ Simulated API interactions with delays
- ✅ All CRUD operations properly simulated
- ✅ **DONE:** User-specific borrowing tracking
- ✅ **DONE:** Complete borrowing history

#### 6. Error Handling & Security
- ✅ Error messages displayed with ErrorMessage component
- ✅ Prevent negative stock (never goes below 0)
- ✅ **DONE:** 2-book limit enforcement with clear error messages
- ✅ **DONE:** Over-return prevention with validation
- ✅ **DONE:** User-specific borrow/return validation
- ✅ Validation for all edge cases

#### 7. Testing & Code Quality
- ✅ Clean folder structure by feature
- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Clean Git history
- ✅ **DONE:** Comprehensive test suite (12 tests covering all scenarios)
- ✅ Tests for borrow limit, over-return, multi-user scenarios
- ✅ Documentation and comments

#### 8. Inventory & Book Management
- ✅ Inventory reflects accurate book counts
- ✅ Admin can monitor overall stock usage
- ✅ **DONE:** Track individual user borrowing records
- ✅ **DONE:** Complete borrowing history with dates
- ✅ **DONE:** Overdue tracking

---

## 🚀 Features Implemented

### User Features
- Browse available books
- Borrow books (with stock validation)
- Return books
- View stock availability in real-time
- Disabled borrow button when out of stock

### Admin Features
- Add new books to inventory
- View complete inventory with statistics
- Monitor total, available, and borrowed books
- Track stock status (In Stock / Out of Stock)

### Shared Components
- Reusable Button component
- ErrorMessage component for error handling
- AuthContext for authentication state management
- ProtectedRoute for role-based access control

---

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx (TODO: Implement routing)
│
├── auth/
│   ├── AuthContext.tsx          ✅ Auth state management
│   ├── ProtectedRoute.tsx       ✅ Role-based routing
│   └── auth.types.ts            ✅ Auth type definitions
│
├── books/
│   ├── components/
│   │   ├── BookCard.tsx         ✅ Book display with actions
│   │   └── BookList.tsx         ✅ Grid of books
│   ├── services/
│   │   └── book.service.ts      (TODO: Optional service layer)
│   ├── hooks/
│   │   └── useBooks.ts          ✅ Book operations hook
│   └── types.ts                 ✅ Book type definitions
│
├── admin/
│   ├── AdminDashboard.tsx       ✅ Inventory & stats
│   └── AddBookForm.tsx          ✅ Add new books
│
├── user/
│   └── UserDashboard.tsx        ✅ User book browsing
│
├── mock/
│   ├── mockData.ts              ✅ Mock book data
│   └── mockApi.ts               ✅ Simulated API
│
├── shared/
│   ├── components/
│   │   ├── Button.tsx           ✅ Reusable button
│   │   └── ErrorMessage.tsx     ✅ Error display
│   └── utils/
│       └── constants.ts         (Ready for use)
│
├── tests/
│   └── borrowReturn.test.ts     (TODO: Add real tests)
│
└── index.tsx                    ✅ App entry point
```

---

## 🔧 What Still Needs to Be Done

### High Priority
1. **Implement Routing** (`app/routes.tsx`)
   - Set up React Router
   - Define routes for User Dashboard, Admin Dashboard, Login
   - Connect with ProtectedRoute component

2. **Borrow Limit** (Max 2 books per user)
   - Track user borrowing count
   - Disable borrow when user has 2 books
   - Add UI indicator showing "X/2 books borrowed"

3. **Track Who Borrowed What**
   - Add borrowing records (userId, bookId, borrowDate)
   - Admin view to see who has which books
   - Due date tracking (optional)

4. **Third-Party Authentication**
   - Integrate Google OAuth or GitHub OAuth
   - Replace mock login with real authentication
   - Store auth tokens securely

### Medium Priority
5. **Enhanced Error Handling**
   - HTTP status code handling (400, 401, 403)
   - Better error messages for edge cases
   - Form validation improvements

6. **Testing**
   - Unit tests for components
   - Integration tests for borrow/return flow
   - Test coverage for edge cases

7. **Prevent Over-Returning**
   - Better validation to ensure books can't be returned if not borrowed
   - Track individual user borrowing to validate returns

### Low Priority
8. **Documentation**
   - Add JSDoc comments to functions
   - Component documentation
   - API documentation

9. **UI Enhancements**
   - Loading states
   - Success notifications
   - Better mobile responsiveness

---

## 💻 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Swatinavgurukul/hexad-library.git
cd hexad-library
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

---

## 🧪 Testing

Run tests with:
```bash
npm test
```

> **Note:** Test implementation is currently minimal and needs to be expanded.

---

## 📝 Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **React Hooks** - State management
- **Mock API** - Simulated backend
- **CSS-in-JS** - Inline styling (can be migrated to CSS modules)

---

## 🎯 Next Steps

1. Implement routing with React Router
2. Add borrow limit (2 books per user)
3. Track borrowing records (who borrowed what)
4. Add third-party authentication
5. Write comprehensive tests
6. Improve error handling and validation

---

## 👥 Assignment Evaluation Criteria

This project addresses the following frontend development requirements:

- ✅ Book borrowing and returning functionality
- ✅ Admin privileges for inventory management
- ✅ User-friendly interface
- ⚠️ Authentication (basic mock, needs third-party)
- ✅ Backend mocking
- ⚠️ Error handling (basic, needs enhancement)
- ⚠️ Testing (minimal, needs expansion)
- ✅ Clean code structure and Git history

---

## 📄 License

This project was created as part of a frontend development assignment.

---

## 🤝 Contributing

This is an assignment project. For any questions or feedback, please contact the repository owner.
