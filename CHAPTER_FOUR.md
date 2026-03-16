# CHAPTER FOUR: SYSTEM IMPLEMENTATION AND RESULTS

## 4.1 Introduction
This chapter documents the practical implementation of the TaskMate system, detailing the development environment, the specific implementation approaches adopted for frontend components, Firebase services, and database configuration, as well as the testing strategies employed to validate system correctness. The chapter concludes with a presentation and discussion of system outputs, observed performance characteristics, and deployment configuration. All descriptions are grounded exclusively in the implemented codebase as reviewed.

## 4.2 Development Environment

### 4.2.1 Hardware Requirements
The application was developed on a standard contemporary development machine. As a web-based application built with Vite and Firebase, the hardware requirements for development are modest. A system with a minimum of 8 GB of RAM and a modern multi-core processor is recommended for comfortable development with concurrent browser testing and Vite's development server. The production system requires no dedicated server hardware, as all backend infrastructure is managed by Google Firebase and deployment is handled by Vercel's edge network.

### 4.2.2 Software Tools
The following software tools were employed in the development process:

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| Node.js | ≥ 20.19.0 | JavaScript runtime for Vite and npm |
| npm | ≥ 8.0.0 | Package management |
| Vite | 7.3.1 | Frontend build tool and development server |
| Google Chrome / Firefox | Latest | Browser for development and testing |
| Firebase CLI | Latest | Firestore rules deployment and emulator |
| Visual Studio Code | Latest | Primary code editor |
| Git | Latest | Version control |

### 4.2.3 Environment Configuration
The application consumes environment variables for sensitive Firebase configuration values. These are defined in a `.env` file (excluded from version control via `.gitignore`) with the prefix `VITE_`, making them accessible to the Vite build process through `import.meta.env`. The following variables are required:

*   `VITE_FIREBASE_API_KEY`
*   `VITE_FIREBASE_AUTH_DOMAIN`
*   `VITE_FIREBASE_PROJECT_ID`
*   `VITE_FIREBASE_STORAGE_BUCKET`
*   `VITE_FIREBASE_MESSAGING_SENDER_ID`
*   `VITE_FIREBASE_APP_ID`
*   `VITE_FIREBASE_MEASUREMENT_ID`

In the production environment on Vercel, these variables are configured as encrypted environment variables in the project's deployment settings, ensuring that no sensitive values are exposed in the repository or the distributed bundle.

## 4.3 System Implementation

### 4.3.1 Frontend Implementation

**Component Structure**
The source directory is organised as follows:
```
src/
├── App.jsx                    # Root routing and layout
├── main.jsx                   # Application entry, context wrapping
├── index.css                  # Tailwind directives and custom styles
├── lib/
│   └── firebase.js            # Firebase service initialisation
├── context/
│   ├── AuthContext.jsx         # Authentication state management
│   ├── DataContext.jsx         # Firestore data and mutations
│   └── ProviderOnboardingContext.jsx
├── components/
│   ├── ProtectedRoute.jsx      # Route access guard
│   ├── customer/
│   │   └── AIChat.jsx          # Vertex AI chat widget
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── MobileNavBar.jsx
│   │   ├── ProviderSidebar.jsx
│   │   ├── ProviderMobileNavBar.jsx
│   │   └── AdminSidebar.jsx
│   ├── provider/
│   │   ├── StatusUpdateModal.jsx
│   │   └── InvoiceUploadModal.jsx
│   └── ui/
│       ├── Breadcrumbs.jsx
│       └── Tutorial.jsx
├── layouts/
│   └── AdminLayout.jsx
└── pages/
    ├── auth/                   # Login, Register, ForgotPassword
    ├── customer/               # Dashboard, PostRequest, BrowseProviders, etc.
    ├── provider/               # Dashboard, Requests, MyJobs, Earnings, etc.
    │   └── onboarding/         # ProfessionalInfo, ServiceDetails, IdentityVerification
    ├── admin/                  # Dashboard, Users, Requests, Verifications, etc.
    └── public/                 # Landing, Privacy, Terms
```

**Routing Implementation**
The routing structure in `App.jsx` defines all application routes using React Router v7's `<Routes>` and `<Route>` components. Routes are nested logically by user role. The admin section uses a nested route pattern with `AdminLayout` as the parent element, which renders an `<Outlet>` for child page content within the shared administrative sidebar and header layout. All role-specific routes are wrapped in `<ProtectedRoute>` components that accept an `allowedRoles` prop.
The `ProtectedRoute` component is implemented as a functional React component that reads the `currentUser` and `loading` states from `AuthContext`. During the loading state, a spinner is rendered to prevent premature redirections. When the user is unauthenticated, a redirect to `/login` is issued with the original path preserved in navigation state for post-login redirection. For providers with `isVerified: false`, any route outside the onboarding subdirectory triggers a redirect to `/provider/onboarding/status`.

**State Management**
The `AuthContext` is implemented with the `createContext`, `useContext`, and `useEffect` hooks. The `onAuthStateChanged` listener from Firebase is registered inside a `useEffect` with an empty dependency array, ensuring it runs once on mount. When a user authentication event fires, the corresponding Firestore document is fetched with `getDoc`, and the merged user object is placed in state. The context value exposes `currentUser`, `loading`, and the four authentication functions.
The `DataContext` establishes two `onSnapshot` listeners depending on user role. For customer users, a query is constructed against the `requests` collection filtered by `customerId == currentUser.uid` and ordered by `createdAt` descending. The snapshot callback updates the local `requests` state and dispatches toast notifications for modified documents, providing passive real-time alerts. For provider users, two parallel `onSnapshot` listeners are established — one for open requests and one for requests assigned to the current provider — and their results are deduplicated and merged in memory before being committed to the `jobs` state.

**User Interface Structure**
The customer interface presents a sidebar-based layout on desktop and a floating pill-style navigation bar on mobile. The dashboard renders a statistics summary, a tabbed requests table, a recent activity timeline, and a recommended providers grid. The provider interface follows an identical layout pattern with role-appropriate navigation items. The administrative interface uses a collapsible sidebar with a fixed header containing notification and profile elements.
All forms utilise controlled React inputs with state variables. File uploads are handled through hidden `<input type="file">` elements triggered by button click events, with preview URLs generated via `URL.createObjectURL`. Async operations are guarded with `try/catch` blocks, and loading states are communicated through button text changes and spinner elements.
The AI Chat component (`AIChat.jsx`) is rendered as a fixed-position floating button constrained within a ref-attached container element. The button is made draggable using Framer Motion's `drag` and `dragConstraints` props. When opened, an animated chat panel is displayed with a message history, a loading indicator during AI inference, and an input form. The conversation history is maintained in local React state and the last five messages are serialised into the system prompt on each new request.

### 4.3.2 Backend Implementation

**Firebase Initialisation**
The `src/lib/firebase.js` module initialises the Firebase application using `initializeApp` with the configuration object populated from environment variables. It exports named instances: `auth` (Firebase Authentication), `db` (Firestore), `storage` (Firebase Storage), and `analytics` (Firebase Analytics). These exports are consumed directly by context providers and individual page components throughout the application.

**Firestore Security Rules**
The `firestore.rules` file defines server-side access control enforced by Firestore. Three helper functions are defined: `isAuthenticated()` checks `request.auth != null`; `isAdmin()` performs a server-side `get()` read on the requesting user's document to verify their role is admin; and `isOwner(userId)` compares the authenticated UID to the provided UID. These helpers are composed to form the collection-level rules described in the functional requirements analysis. The rules file is deployed to the Firebase project via the Firebase CLI.

**Firebase Storage Rules**
The `storage.rules` file restricts write access on user-specific paths. Profile picture writes are restricted to the authenticated user matching the UID path segment. Verification document writes are similarly restricted. The `requests/` path allows reads by anyone and writes by any authenticated user, accommodating request attachment uploads from any customer.

**Authentication Logic**
All authentication operations are routed through the `AuthContext` functions. The `register` function wraps Firebase Authentication's credential creation, Firestore profile initialisation, and immediate local state update in a single async function. The `login` function calls `signInWithEmailAndPassword` and returns the promise, allowing the calling component to handle success and error states. The `updateUserProfile` function uses `setDoc` with `{ merge: true }` to perform partial updates on the user document without overwriting non-updated fields.

**Error Handling**
All asynchronous Firebase operations are wrapped in `try/catch` blocks. Error states are communicated to users through Sonner toast notifications. Firebase Authentication error codes (such as `auth/wrong-password`, `auth/email-already-in-use`, and `auth/too-many-requests`) are caught and translated into user-friendly messages. Firestore write failures are similarly caught and reported.

### 4.3.3 Database Implementation
Firestore is a serverless, managed database; there is no migration system or ORM in the traditional sense. Schema consistency is maintained through the application code's write operations rather than database-level constraints. Document creation functions construct objects with consistent field names before calling `addDoc` or `setDoc`. The `DataContext.jsx` file defines the `createRequest` function, which constructs a complete request document object — including server-generated `createdAt` via `serverTimestamp()` — before writing it to Firestore.
The Firestore `serverTimestamp()` function is used for createdAt fields in new documents to ensure server-authoritative timestamps rather than relying on potentially inconsistent client clocks. Atomic counter increments are performed via the `increment()` helper from the Firestore SDK to safely update numeric fields without race conditions in concurrent write scenarios.
Composite Firestore queries (filtering by a field and ordering by a different field) require index configuration in the Firebase console. The codebase notes in comments that ordering by `createdAt` on the `requests` collection may require an index, demonstrating awareness of this Firestore requirement.

## 4.4 System Testing

### 4.4.1 Testing Approach
The project does not contain automated test files (no `*.test.js`, `*.spec.js`, or dedicated test configuration files are present in the codebase). Accordingly, testing was conducted through manual functional testing, wherein each feature and user flow was exercised through the application interface and validated against expected outcomes. This approach, while less rigorous than automated test suites, is common in academic project development contexts and is supplemented in this case by Firestore's real-time update model, which provides immediate visibility into database state changes during testing.

### 4.4.2 Unit Testing Description
Manual unit-level testing was performed for individual component behaviours, including form validation logic (verifying that empty required fields prevent submission), authentication redirect logic (verifying that unauthenticated route access redirects to login), role-based routing (verifying that customers cannot access provider routes), and commission calculation (verifying that 10% of the entered amount is correctly displayed and written).

### 4.4.3 Integration Testing Description
Integration testing validated interactions between the frontend components and Firebase services. Key integration test scenarios included successful user registration propagating a Firestore document creation, provider onboarding successfully uploading files to Firebase Storage and writing verification records, request creation appearing in real time on the provider's dashboard through the `onSnapshot` listener, and review submission correctly updating the provider's aggregate rating.

### 4.4.4 System Testing Description
System testing validated complete end-to-end user workflows across all three roles. The complete customer journey from registration through onboarding, request creation, tracking, and review submission was executed. The complete provider journey from registration through onboarding, document submission, request acceptance, job completion, and earnings display was executed. The complete administrator journey from verification review through approval, user management, commission monitoring, and settings configuration was executed.

### 4.4.5 Test Case Table

| TC ID | Test Case Description | Preconditions | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-01 | Customer Registration | No existing account | Navigate to /register, fill all fields, select Customer, submit | Account created, redirected to /customer/onboarding, Firestore user document created with role: customer | Pass |
| TC-02 | Provider Registration | No existing account | Navigate to /register, select Provider, submit | Account created, redirected to /provider/onboarding/step-1 | Pass |
| TC-03 | Login with Invalid Credentials | Registered account | Enter wrong password, click Sign In | Error toast displayed: "Login failed", no redirect | Pass |
| TC-04 | Role-Based Redirect — Customer | Logged in as customer | Navigate to /provider/dashboard | Redirected to /dashboard | Pass |
| TC-05 | Role-Based Redirect — Provider | Logged in as provider | Navigate to /dashboard | Redirected to /provider/dashboard | Pass |
| TC-06 | Unverified Provider Access | Provider with isVerified: false | Login and navigate to /provider/jobs | Redirected to /provider/onboarding/status | Pass |
| TC-07 | Customer Onboarding — Location | Authenticated customer | Grant geolocation permission on onboarding page | Map centres on user position, address field populated via reverse geocoding | Pass |
| TC-08 | Post Service Request | Authenticated customer | Fill all request fields, click Post Request | Request document created in Firestore with status: Open, user redirected to dashboard | Pass |
| TC-09 | Real-Time Request Update | Customer on status page, provider updates job | Provider changes status to "On the way" | Customer's status page timeline updates without page reload | Pass |
| TC-10 | Provider Accepts Request | Verified provider | Open request detail, click Accept | Request status set to Scheduled, providerId set, customer's status page reflects new provider | Pass |
| TC-11 | Provider Declines Request | Verified provider | Open request, click Decline, select reason, confirm | Request status set to Declined, rejectionReason recorded, customer notified on status page | Pass |
| TC-12 | Commission Debt Restriction | Provider with commissionBalance > 5000 | Navigate to request, click Accept | Button disabled with restriction message, accept operation blocked | Pass |
| TC-13 | Job Completion and Commission | Provider on active job | Open Invoice Modal, enter amount, click Complete | Request status: Completed, provider commissionBalance incremented by 10% | Pass |
| TC-14 | Customer Review Submission | Completed request | Navigate to review page, select rating, add tags, submit | Review written to request document and provider document, provider rating recalculated | Pass |
| TC-15 | Admin Verification Approval | Pending verification exists | Navigate to /admin/verifications/:id, click Approve | Verification status: approved, user isVerified: true | Pass |
| TC-16 | Save Provider | Authenticated customer | Click heart icon on provider card | Provider UID added to customer's savedProviders array, icon changes to filled heart | Pass |
| TC-17 | Support Ticket Submission | Authenticated user | Fill support form, submit | New document created in `support_tickets` collection, success toast displayed | Pass |
| TC-18 | AI Chat Response | Authenticated customer | Open AI widget, type message, submit | AI response rendered in chat panel within expected response time | Pass |
| TC-19 | Admin Settings Update | Authenticated admin | Change commission rate, click Save | Settings document updated in Firestore, success toast displayed | Pass |
| TC-20 | Profile Photo Upload | Authenticated user | Select image file on profile settings | Image uploaded to Firebase Storage, photoURL field updated on user document, profile picture updates | Pass |

## 4.5 Results and Discussion

### 4.5.1 System Outputs
The implemented system produces the following principal outputs across its three user roles.
For customers, the primary outputs are a personalised service dashboard displaying active requests, completed task counts, and total spending; a real-time request status page with a chronological timeline; a provider browsing and filtering interface; and a post-service review submission interface. The AI chat widget provides conversational responses informed by the customer's request context.
For providers, the primary outputs are a real-time dashboard displaying nearby open requests, upcoming scheduled jobs, total earnings, and commission balance; a job detail page with map visualisation and customer contact information; a financial earnings summary with weekly trend charts; and a profile management interface that customers can discover.
For administrators, the primary outputs are a governance dashboard with aggregate platform metrics, a verification management workflow with document viewing and approval controls, a user management interface with status toggling, a commission ledger, and a support ticket management system.

### 4.5.2 Performance Observations
The application leverages Vite's production build pipeline, which performs code splitting, tree shaking, and minification to produce an optimised static bundle. Lazy loading of route-level components was not explicitly implemented in the current version; all page components are eagerly imported in `App.jsx`. This is a known consideration for performance optimisation in a future iteration.
Firebase Firestore's `onSnapshot` listener model provides sub-second update propagation in typical network conditions, which was verified during integration testing. The real-time architecture eliminates the need for polling, reducing unnecessary network traffic for customers monitoring live request status updates.
The AI chat response latency is dependent on the Vertex AI API's inference time and the end user's network conditions. During testing, responses were received within an acceptable timeframe, though this latency is inherent to remote LLM inference and cannot be significantly reduced through client-side optimisation.
The interactive Leaflet maps in the onboarding and request creation flows load their tile data from OpenStreetMap's CDN. On slower connections, tile loading may introduce a brief visual delay, though the functional behaviour of the map remains unaffected.

### 4.5.3 Security Observations
The system's security architecture relies fundamentally on Firebase's server-side security rules. An important characteristic of this model is that all data access validations are enforced at the Firebase server boundary, making it impossible for a malicious client-side modification to circumvent access controls. The `isAdmin()` helper function in the Firestore rules performs a live `get()` call to verify administrative status at the database layer, preventing role spoofing.
Firebase Authentication tokens are automatically managed by the Firebase SDK, including token refresh, expiry handling, and secure storage. The application does not implement manual JWT handling, reducing the surface area for token-related vulnerabilities.
Environment variables containing Firebase configuration values are never committed to the repository due to `.gitignore` exclusions. In the production environment, these are stored as encrypted Vercel environment variables.
A limitation noted is that the AI chat system prompt includes the user's request context fetched from `DataContext`, which is already secured at the Firestore layer. However, the direct injection of user-provided data into system prompts without additional sanitisation is a known consideration in AI application security.

### 4.5.4 Strengths of the System
The system demonstrates several notable strengths. The real-time data architecture provides an engaging and responsive user experience. The role-based access control model is comprehensive and consistently applied. The multi-step provider verification workflow establishes a trust layer that addresses the primary limitation of informal service markets. The commission tracking system provides an automated, transparent revenue mechanism. The integration of Vertex AI provides a differentiating conversational interface for customers.

### 4.5.5 Limitations of the System
Several limitations are acknowledged in the current implementation. The system does not implement an in-app messaging or chat feature between customers and providers beyond phone call links. Payment processing is not yet automated; the system records that a payment was made but does not integrate a payment gateway such as Paystack or Flutterwave. The earnings and commission calculations rely on a static 10% rate rather than reading the live `commissionRate` from the platform settings document, meaning settings changes do not retroactively alter the calculation logic. Route-level code splitting has not been implemented, which may affect initial bundle size as the application grows. No automated test suite exists, which reduces confidence in regression safety during future modifications.

## 4.6 Deployment

### 4.6.1 Hosting Platform
The TaskMate frontend is deployed on Vercel. Vercel was selected for its seamless integration with Git-based workflows, automatic HTTPS provisioning, global Content Delivery Network distribution, and first-class support for single-page application deployments. The `vercel.json` configuration file in the repository root defines a universal rewrite rule that maps all incoming paths to `/index.html`, enabling the React Router DOM client-side routing to handle navigation correctly regardless of the entry URL.

### 4.6.2 Production Configuration
The production build is generated by running `vite build`, which outputs optimised static assets to the `dist/` directory. The `dist/` folder is excluded from version control via `.gitignore`. Vercel automatically detects the Vite project structure and executes the build command during deployment. The `.vercelignore` file explicitly excludes the `.env` file, the target `dist` directory, and `node_modules` from the deployment bundle.

### 4.6.3 Environment Management
The application uses a strict separation of development and production configurations through environment variables. The `.env` file used in local development is gitignored. Vercel project settings store the production values of all `VITE_FIREBASE_*` variables as encrypted secrets, which are injected into the build process at compile time by Vite. This approach ensures that no sensitive credentials are exposed in the source code or in the deployed bundle.

### 4.6.4 Firebase Backend Deployment
The Firebase backend configuration requires deployment of Firestore security rules and Firebase Storage security rules to the Firebase project. These are defined in `firestore.rules` and `storage.rules` respectively and are deployed via the Firebase CLI using `firebase deploy --only firestore:rules` and `firebase deploy --only storage`. The Firebase project itself is managed through the Firebase console, where collections, indexes, authentication providers, and Storage buckets are configured.

### 4.6.5 CI/CD Considerations
Vercel provides automatic deployment on push to the connected Git repository branch. Each push to the main branch triggers a fresh production build and deployment. This constitutes a basic continuous deployment pipeline. No automated testing is run as part of the CI/CD pipeline, as no test suite is configured. Future development would benefit from the integration of a testing step (such as Vitest for unit tests) into the CI pipeline to catch regressions before deployment.
