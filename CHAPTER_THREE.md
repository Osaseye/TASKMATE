# CHAPTER THREE: SYSTEM ANALYSIS AND DESIGN

## 3.1 Introduction
This chapter presents a detailed analysis and design of the TaskMate web application, a digital service marketplace platform developed to connect Nigerian service consumers with verified local service providers. The chapter proceeds through a structured examination of the existing systems against which TaskMate is proposed, identifies functional and non-functional system requirements derived from the implemented codebase, and documents the architectural decisions, design models, database schema, algorithmic logic, and development tools that underpin the system. The analysis draws entirely from the actual implemented code, including frontend components, Firebase configuration, security rules, routing logic, context providers, and deployment configuration, to produce a technically rigorous and academically appropriate account of the system as built.

## 3.2 Analysis of the Existing System

### 3.2.1 Nature of the Existing System
Prior to the development of TaskMate, the process of locating and engaging skilled service providers in Nigeria — including artisans such as plumbers, electricians, house cleaners, carpenters, and mechanics — was conducted through informal, largely manual channels. Prospective clients typically relied on word-of-mouth referrals from friends, family, and colleagues, the use of unverified social media contacts, physical signboards in residential neighbourhoods, or informal WhatsApp and Facebook group listings. Service providers similarly relied on personal networks and physical visibility to attract clientele.
While some digital platforms exist in certain African markets, the Nigerian informal service sector remained largely fragmented, with no centralised, trust-based digital infrastructure that addressed the unique concerns of Nigerian urban dwellers. The mechanisms available were characterised by several observable limitations.

### 3.2.2 Limitations of the Existing System
The principal limitations of the pre-existing informal system include the following:
*   **Absence of Provider Verification:** There existed no structured mechanism to verify the identity, qualifications, or background of individuals offering services. Clients had no means of confirming that a provider was who they claimed to be, which created security concerns, particularly when strangers were permitted access to private residences.
*   **Lack of Price Transparency:** Service charges were entirely undisclosed until the point of engagement, frequently leading to disputes and mistrust between clients and artisans. No standard rate existed for most service categories, and customers were often subject to exploitative pricing without recourse.
*   **No Accountability or Feedback Mechanism:** Once a service was delivered, there was no structured system through which customers could leave reviews or ratings. This absence of accountability meant that poor performers faced no consequences and good performers received no visible reward.
*   **Inefficient Request Matching:** Clients had no systematic way to identify providers who were available, located nearby, and skilled in the specific service required. This frequently resulted in delays and mismatches.
*   **No Formal Payment or Commission Tracking:** Payments were made informally, in cash, with no digital record. Service platforms, where they existed, had no means of tracking completed transactions or collecting commissions.
*   **Limited Scalability:** Informal networks could not scale to serve larger metropolitan areas efficiently. As cities such as Lagos and Abuja grew, the informal model became increasingly inadequate.

## 3.3 The Proposed System

### 3.3.1 Overview
TaskMate is a full-stack web application built on a React frontend and Google Firebase backend-as-a-service infrastructure. The system is designed to serve as a digital marketplace that connects service consumers ("customers") with verified skilled professionals ("providers") across Nigerian cities. The platform manages the entire service lifecycle from request creation, provider discovery and assignment, real-time status tracking, to payment record and post-service review.

### 3.3.2 Target Users
The system recognises three distinct user roles, each with a discrete set of privileges and interfaces:
*   **Customers** are individuals who require household, technical, or personal services. They register on the platform, complete an onboarding process to configure their location and preferences, and subsequently post service requests, browse provider profiles, track request statuses, and submit reviews upon job completion.
*   **Providers** are skilled professionals who register on the platform and undergo a multi-step verification process involving the submission of personal identification and optional business licensing documents. Once approved by an administrator, providers can browse and accept open service requests, manage their job schedules, track their earnings, and maintain a public profile.
*   **Administrators** are platform operators with elevated privileges. They manage provider verification workflows, monitor all requests and transactions, configure platform-wide settings such as the commission rate, handle support tickets raised by users, and oversee user account statuses.

### 3.3.3 Core Objectives
The system is designed to accomplish the following specific objectives:
*   To provide a secure, role-based authentication system that distinctly controls platform access for customers, providers, and administrators.
*   To implement a multi-step provider onboarding and document verification workflow that ensures only trusted professionals serve customers.
*   To enable customers to post service requests with location, description, budget, and urgency details, and to have those requests matched to available providers.
*   To provide real-time tracking of service request lifecycles from posting through assignment, execution, and completion.
*   To compute and track a 10% platform commission on all completed jobs, recording outstanding balances per provider.
*   To integrate an AI-powered conversational assistant powered by Google's Gemini model to assist customers in navigating the platform and understanding their requests.
*   To support a comprehensive administrative dashboard for platform governance.

### 3.3.4 Key Improvements over Existing Methods
The proposed system addresses every limitation identified in Section 3.2.2. It establishes an identity verification workflow, provides transparent pricing through budget fields and hourly rate disclosures on provider profiles, enables structured post-service reviews and star ratings, automates request-to-provider matching through Firestore queries, records all transactions digitally for commission tracking, and scales through cloud-native Firebase infrastructure without the need for dedicated server management.

## 3.4 System Requirements

### 3.4.1 Functional Requirements
The following functional requirements were derived directly from the implemented components, routes, context providers, and Firebase security rules.

*   **FR-01: User Registration and Authentication**
    The system shall allow new users to register with a full name, email address, password, and a selected role (customer or provider). Firebase Authentication is used for credential management. Upon registration, a corresponding user document is created in the Firestore `users` collection with the role, display name, email, creation timestamp, and verification status. Login is performed via email and password, and session state is maintained through Firebase's `onAuthStateChanged` listener, as implemented in `AuthContext.jsx`.

*   **FR-02: Role-Based Access Control**
    The system shall enforce distinct access rights based on user roles. A `ProtectedRoute` component wraps all private routes and reads the `role` field from the authenticated user's Firestore document to determine access. Customers are redirected to `/dashboard`, providers to `/provider/dashboard`, and administrators to `/admin/dashboard`. Providers with `isVerified: false` are redirected to the onboarding status page regardless of the route they attempt to access.

*   **FR-03: Customer Onboarding**
    The system shall provide a three-step customer onboarding flow upon first registration. Step one collects a display name, phone number, location (with geolocation support via the browser's Geolocation API and OpenStreetMap reverse geocoding), and a profile photograph. Step two allows the customer to select from eight service preference categories. Step three presents the platform's terms and consent form. Upon completion, the customer's Firestore profile is updated with all gathered data, including the uploaded photograph URL from Firebase Storage.

*   **FR-04: Provider Onboarding**
    The system shall provide a three-step provider onboarding flow. Step one collects professional information including business name, phone number, service category, years of experience, a business description, and a physical address, as implemented in `ProfessionalInfo.jsx`. Step two collects service area (configurable via an interactive Leaflet map with a radius slider), weekly availability schedule, hourly rate, minimum service fee, and a negotiability toggle, as implemented in `ServiceDetails.jsx`. Step three requires the upload of a government-issued identification document and, optionally, a business licence, as implemented in `IdentityVerification.jsx`. Upon submission, a verification document is created in the Firestore `verifications` collection with a pending status.

*   **FR-05: Administrator Verification Workflow**
    The system shall allow administrators to review pending provider verification applications, inspect submitted documents, and approve or reject applications. Approval sets `isVerified: true` and `verificationStatus: 'verified'` on the provider's user document. Rejection sets `isVerified: false` and `verificationStatus: 'rejected'`.

*   **FR-06: Service Request Creation**
    The system shall allow authenticated customers to create service requests. Each request contains a title, service category, budget, description, urgency level (low, medium, high/emergency), a geographic location with optional map-pin coordinates collected from a Leaflet map, an optional photograph upload, and an optional direct provider assignment (where a request may be directed to a specific provider via navigation state). Requests are stored in the Firestore `requests` collection.

*   **FR-07: Real-Time Request Status Tracking**
    The system shall provide real-time updates to service request status through Firestore `onSnapshot` listeners. Customers can view a detailed status page for each of their requests, including a chronological timeline of status updates. Providers can update request status through a modal interface that writes new timeline entries to the Firestore document.

*   **FR-08: Provider Discovery and Browsing**
    The system shall allow customers to browse all registered providers. The `BrowseProviders.jsx` component fetches provider documents from Firestore and renders them in a grid layout with filtering capabilities by service category, minimum rating, and price range.

*   **FR-09: Provider Profile Viewing**
    The system shall render detailed provider profiles including biography, skills, years of experience, hourly rate, ratings, completed job count, portfolio images, and customer reviews. Customers may initiate a service request directly targeted at a specific provider from their profile page.

*   **FR-10: Saved Providers**
    The system shall allow customers to save provider profiles to a personal list using Firestore's `arrayUnion` and `arrayRemove` operations on the `savedProviders` field of the customer's user document. The saved list is displayed on a dedicated page.

*   **FR-11: Provider Job Management**
    The system shall allow providers to view available (open) service requests and requests directly assigned to them. Providers may accept a request, which updates its status to "Scheduled", assigns the provider's UID and display name, and logs a timeline entry. Providers may also decline requests with a mandatory reason selection, setting the request status to "Declined" and recording the reason for the customer.

*   **FR-12: Job Completion and Commission Recording**
    The system shall allow providers to mark a job as complete by recording the final amount collected, triggering a 10% commission computation. The commission is added to the provider's `commissionBalance` field in their Firestore user document via `increment()`, and the provider's total earnings and job completion count are similarly updated.

*   **FR-13: Post-Service Review System**
    The system shall allow customers to submit star ratings (1 to 5), textual comments, and quality tags (e.g., Punctuality, Professionalism) for completed jobs. The review is written both to the request document and to the provider's `reviews` array in their user document. The provider's aggregate rating is recalculated as a weighted average upon each new review submission.

*   **FR-14: Earnings Dashboard**
    The system shall provide providers with a financial summary including total all-time earnings from completed jobs, current month earnings, weekly trend bar charts derived from job completion dates, and outstanding commission balance. The outstanding balance is subject to a ₦5,000 debt limit, beyond which a restriction warning is displayed.

*   **FR-15: Admin Dashboard and Reporting**
    The system shall provide administrators with a central dashboard displaying total platform commission, pending commissions, total request count, and active provider count fetched via Firestore aggregate queries. A recent verifications list and recent commissions table are also rendered.

*   **FR-16: Admin User Management**
    The system shall allow administrators to view all registered users separated into providers and customers, toggle user account status between Active and Suspended, and navigate to individual user detail pages showing activity history and commission debt.

*   **FR-17: Admin Commission Tracking**
    The system shall display all completed requests with their associated commission amounts in a paginated table, and compute total platform revenue.

*   **FR-18: Admin Settings Management**
    The system shall allow administrators to configure platform-wide settings including the commission rate, support email address, maximum job radius, new user registration toggle, and maintenance mode flag, persisted to the Firestore `settings` collection.

*   **FR-19: Support Ticket System**
    The system shall allow both customers and providers to submit support tickets with a subject category and message body. Tickets are stored in the Firestore `support_tickets` collection and are accessible to administrators who may mark them as In Progress, Resolved, or delete them.

*   **FR-20: AI-Powered Chat Assistant**
    The system shall provide an AI-powered floating chat assistant available on customer-facing pages, implemented in `AIChat.jsx`. The assistant is powered by the Firebase Vertex AI SDK using Google's `gemini-2.0-flash` model. The system prompt incorporates the customer's live request context and saved provider count to provide personalised responses.

*   **FR-21: Provider Schedule View**
    The system shall render a provider's job schedule grouped by date and divided into upcoming, pending, and historical categories.

*   **FR-22: Interactive Maps**
    The system shall integrate Leaflet-based interactive maps in the customer onboarding flow and the service request creation form to allow geographic location selection. Job details pages similarly render a map showing the service location when coordinates are available.

### 3.4.2 Non-Functional Requirements
*   **NFR-01: Security**
    The system implements Firebase Authentication, which manages credential hashing and session token issuance internally through Google's identity infrastructure. Firestore security rules (defined in `firestore.rules`) enforce server-side access control. All collection-level operations require authenticated requests (`request.auth != null`). Update and delete operations on the `users` collection are restricted to the document owner or an administrator via the `isOwner()` and `isAdmin()` helper functions. Administrator verification is enforced by reading the authenticated user's Firestore role field server-side, preventing privilege escalation through client-side role manipulation. Firebase Storage rules restrict write access on user-specific paths to the authenticated user matching the UID segment.

*   **NFR-02: Real-Time Responsiveness**
    The system uses Firestore's `onSnapshot` real-time listener pattern throughout the data layer. The `DataContext.jsx` provider maintains live subscriptions to customer requests and provider jobs, ensuring that all dashboard components reflect the most current data without requiring manual page refresh. Request status changes by providers propagate immediately to the customer's view.

*   **NFR-03: Scalability**
    The system is deployed on Vercel's edge network and relies on Google Firebase as its cloud backend. Firebase Firestore is a horizontally scalable, document-oriented NoSQL database managed by Google Cloud, capable of handling substantial concurrent connections without manual scaling configuration. Firebase Storage uses Google Cloud Storage internally, ensuring high-throughput file handling. The use of a Backend-as-a-Service (BaaS) model eliminates the need for manual server provisioning or infrastructure management.

*   **NFR-04: Modularity and Maintainability**
    The frontend is structured into clearly delineated directories including pages, components, context, layouts, lib, and pages sub-folders organised by user role. Each page and component encapsulates a single responsibility. Context providers (`AuthContext`, `DataContext`, `ProviderOnboardingContext`) centralise shared state management, reducing prop-drilling and coupling between components. The use of Tailwind CSS utility classes directly in JSX avoids global style conflicts.

*   **NFR-05: Usability**
    The system incorporates a guided tutorial system using React Joyride, activated on first login for each distinct tutorial key per page. Loading states with animated spinners are present on all asynchronous operations. Toast notification feedback via Sonner is provided for all user actions including saves, errors, and status changes. The mobile interface is supported through a responsive layout using Tailwind's responsive prefixes and a fixed-position `MobileNavBar` component.

*   **NFR-06: Availability**
    Deployment to Vercel provides global CDN distribution with automatic failover. The `vercel.json` rewrite rule (`"source": "/(.*)", "destination": "/index.html"`) ensures that all client-side routes are handled correctly by the SPA router, preventing 404 errors on direct URL access.

## 3.5 System Architecture

### 3.5.1 Architectural Pattern
TaskMate is implemented as a Single-Page Application (SPA) using a Client-Server architecture in which the client is a React-based SPA served as a static bundle via Vercel, and the server is Google Firebase's managed cloud infrastructure. The system adopts a Backend-as-a-Service (BaaS) architectural model, which delegates authentication, real-time database management, file storage, and AI integration to Firebase's platform services rather than implementing a custom application server.
Within the frontend, the code follows a component-based architecture typical of React applications, with a clear separation between page-level components, reusable UI components, layout components, shared state managed via the Context API, and utility libraries.

### 3.5.2 Frontend Architecture
The frontend is bootstrapped with Vite and developed in React 19 using JSX syntax. The application entry point is `src/main.jsx`, which renders the root `App` component wrapped in two global context providers: `AuthProvider` and `DataProvider`. The `App.jsx` file defines the application's routing structure within a `BrowserRouter`, delegates animated route transitions to an `AnimatedRoutes` sub-component powered by Framer Motion's `AnimatePresence`, and conditionally renders the AIChat floating widget on customer-facing pages.
All route paths are defined as `Route` elements within the `AnimatedRoutes` component. Private routes are wrapped in the `ProtectedRoute` component, which conditionally renders the child component or redirects based on authentication state and role. Role-specific layouts are provided through shared sidebar and navigation components: `Sidebar` and `MobileNavBar` for the customer interface, `ProviderSidebar` and `ProviderMobileNavBar` for the provider interface, and `AdminSidebar` within the `AdminLayout` wrapper for the administrative interface.
State management is handled through three Context API providers. `AuthContext` exposes the currently authenticated user, loading state, and authentication functions (login, logout, register, updateUserProfile). `DataContext` exposes real-time customer requests, provider jobs, saved provider IDs, and data mutation functions (createRequest, getProviders, toggleSavedProvider). `ProviderOnboardingContext` manages multi-step onboarding form state persisted to localStorage between step navigation.

### 3.5.3 Backend Structure
The backend is provided entirely by Google Firebase services. Firebase Authentication handles user registration, login, session management, and password operations. Firestore serves as the primary database, storing structured documents in five named collections: `users`, `requests`, `verifications`, `settings`, and `support_tickets`. Firebase Storage stores all binary assets including profile photographs, banner images, verification documents, and request attachment images. Firebase Analytics is initialised for usage telemetry. The Firebase Vertex AI SDK provides access to Google's Gemini generative AI models for the chat assistant feature.
The Firebase configuration is stored in `src/lib/firebase.js`, which initialises the Firebase application using environment variables (`VITE_FIREBASE_*`) injected at build time and exports service instances (`auth`, `db`, `storage`, `analytics`) for consumption throughout the application.

### 3.5.4 Database Structure
Firestore employs a flexible document-collection model. The five primary collections are `users`, `requests`, `verifications`, `settings`, and `support_tickets`. Each collection stores JSON-like documents with fields that vary by document type. Relationships between documents are represented through stored UID references rather than foreign key constraints, consistent with the document model. Full details of the schema are provided in Section 3.7.

### 3.5.5 Request Flow
A typical service request flow proceeds as follows. The React SPA is loaded in the user's browser. The `AuthContext` provider subscribes to Firebase Authentication's `onAuthStateChanged` event and retrieves the corresponding Firestore user document, enriching the authenticated user object with role and profile data. Route-level access control via `ProtectedRoute` renders the appropriate interface. When a customer creates a service request, the `createRequest` function in `DataContext` writes a new document to the Firestore `requests` collection via the `addDoc` API. The `DataContext` also maintains an `onSnapshot` listener on the customer's requests, so the new document immediately appears in the dashboard. When a provider accepts the request, `updateDoc` is called with the updated status, provider identity, and a new timeline entry. This update propagates in real time to the customer's status page through their own `onSnapshot` listener.

### 3.5.6 Technology Rationale
React was selected for its component reusability, virtual DOM performance, and extensive ecosystem. Firebase was selected as it eliminates the need for a custom backend, provides real-time database synchronisation, and integrates seamlessly with Google Cloud AI services. Tailwind CSS was chosen for its utility-first approach that accelerates responsive UI development. React Router v7 handles client-side navigation. Framer Motion provides smooth page transition animations. Leaflet with React-Leaflet provides open-source mapping without API costs. Vite provides fast development server startup and optimised production builds.

## 3.6 System Design Models

### 3.6.1 Use Case Diagram
The system defines three primary actors: Customer, Provider, and Administrator. A fourth implicit actor is the Firebase Backend System, which processes authentication and data persistence.
*   **Customer** interacts with the system through the following use cases: Register Account, Login, Complete Onboarding, Post Service Request, Browse Providers, View Provider Profile, Save Provider, Track Request Status, Cancel Request, Submit Service Review, Chat with AI Assistant, Manage Profile Settings, Submit Support Ticket, and Invite Friends.
*   **Provider** interacts through the following use cases: Register Account, Login, Complete Professional Onboarding (three steps), Await Verification, View Dashboard, Browse Available Requests, View Request Details, Accept Request, Decline Request (with reason), Update Job Status, Record Payment and Complete Job, View Earnings, Manage Profile and Services, View Schedule, Submit Support Ticket, and Invite Friends.
*   **Administrator** interacts through the following use cases: Login (to admin console), View Dashboard Metrics, Review Pending Verifications, Approve or Reject Provider, View All Users, Suspend or Activate User, View Commission Report, View All Requests, Force Cancel Request, Manage Support Tickets, and Configure Platform Settings.
Relationships of *include* and *extend* exist between use cases. For example, "Post Service Request" includes "Select Location on Map". "Accept Request" includes "Check Commission Debt Limit" as a precondition extension.

### 3.6.2 Class Diagram
The system's primary domain objects can be described through the following class structures:
*   **User** (stored in Firestore `users` collection): attributes include `uid: String`, `email: String`, `displayName: String`, `role: Enum(customer, provider, admin)`, `isVerified: Boolean`, `photoURL: String`, `phoneNumber: String`, `location: String`, `createdAt: Timestamp`, `completedTutorials: Map`, `savedProviders: Array<String>`, `rating: Float`, `jobsCompleted: Integer`, `commissionBalance: Float`, `services: Array<ServiceObject>`, `reviews: Array<ReviewObject>`, `availability: Map<DaySchedule>`, `category: String`, `hourlyRate: Float`.
*   **ServiceRequest** (stored in Firestore `requests` collection): attributes include `id: String`, `title: String`, `category: String`, `description: String`, `budget: Float`, `urgency: Enum(low, medium, high)`, `location: String`, `coordinates: GeoPoint`, `image: String`, `status: Enum(Open, Pending, Scheduled, In Progress, Completed, Cancelled, Declined)`, `customerId: String`, `customerName: String`, `providerId: String`, `providerName: String`, `timeline: Array<TimelineEntry>`, `createdAt: Timestamp`, `review: ReviewObject`, `finalAmount: Float`, `rejectionReason: String`.
*   **Verification** (stored in Firestore `verifications` collection): attributes include `id: String`, `userId: String`, `providerName: String`, `email: String`, `status: Enum(pending, approved, rejected)`, `submittedAt: Timestamp`, `documents: Map<String, URL>`, `reviewedAt: Timestamp`.
*   **SupportTicket** (stored in `support_tickets` collection): attributes include `id: String`, `userId: String`, `userEmail: String`, `userName: String`, `userRole: String`, `subject: String`, `category: String`, `message: String`, `status: Enum(Open, In Progress, Resolved)`, `createdAt: Timestamp`.
*   **PlatformSettings** (stored in `settings/platform`): attributes include `commissionRate: Float`, `enableNewRegistrations: Boolean`, `maintenanceMode: Boolean`, `supportEmail: String`, `maxJobRadius: Integer`.
*   **ReviewObject** (embedded): `rating: Integer`, `comment: String`, `tags: Array<String>`, `createdAt: String`, `user: String`, `userId: String`.
*   **TimelineEntry** (embedded): `title: String`, `description: String`, `time: String`, `date: String`, `status: String`.

### 3.6.3 Sequence Diagram — Provider Accepting a Request
The following sequence describes the process by which a provider accepts an open service request.
1.  The Provider opens the Requests page. The `Requests.jsx` component renders, and the `DataContext` provides the `jobs` array from its Firestore `onSnapshot` listener.
2.  The Provider selects a specific request, triggering navigation to `/provider/requests/:id`.
3.  `RequestDetails.jsx` mounts and calls `onSnapshot(doc(db, "requests", id))` to subscribe to the specific request document.
4.  The Firestore backend returns the request document data. The component renders the request details.
5.  The Provider clicks "Accept Job". The `handleAccept` function verifies that `currentUser.commissionBalance` does not exceed ₦5,000.
6.  If the balance is within limits, `updateDoc` is called on the request document with `status: "Scheduled"`, `providerId`, `providerName`, `providerPhoto`, `providerPhone`, `acceptedAt`, and a new timeline entry appended via `arrayUnion`.
7.  Firestore persists the update and broadcasts it to all active `onSnapshot` listeners subscribed to this document.
8.  The customer's `RequestStatus.jsx` page, subscribed via `onSnapshot`, receives the updated document and re-renders to show the assigned provider and updated timeline.
9.  A success toast is displayed to the provider and navigation to `/provider/jobs` is triggered.

### 3.6.4 Activity Diagram — Customer Service Request Lifecycle
The activity diagram for a complete service request lifecycle proceeds through the following states:
The customer completes registration and onboarding. The customer navigates to the Post Request page and fills in service details, location, urgency, and budget. The request is submitted and written to Firestore with `status: Open`. The system notifies providers via the real-time feed on their dashboards. A provider views the request details. The provider either accepts (transitioning status to `Scheduled`) or declines (transitioning to `Declined` with a reason). If declined, the customer is notified and may edit and resubmit. If accepted, the provider arrives at the location and updates the job status through the Status Update Modal. The provider completes the job and records the payment via the Invoice Upload Modal. The system writes `status: Completed` and increments the provider's commission balance. The customer receives a prompt to leave a review. The customer submits a rating and comment. The provider's aggregate rating is recalculated and the review is appended to their profile.

### 3.6.5 Entity-Relationship Description
The logical data model contains the following entities and relationships:
A User may be a customer or a provider or an administrator. A Customer (a specialisation of User) places one or more ServiceRequests. A Provider (a specialisation of User) is assigned to zero or more ServiceRequests. A ServiceRequest contains zero or one embedded ReviewObject, and zero or more embedded TimelineEntry objects. A Provider submits exactly one Verification application. A Verification is reviewed by an Administrator. An Administrator manages PlatformSettings. A User may submit zero or more SupportTickets. A SupportTicket is handled by an Administrator. The `savedProviders` field on a Customer document represents a many-to-many association between Customer and Provider.

## 3.7 Database Design
The system utilises Google Cloud Firestore, a NoSQL document-oriented database. Data is organised into five top-level collections. Firestore does not enforce rigid schemas; however, the codebase establishes consistent document structures as documented below.

### 3.7.1 Collection: users
This collection stores all registered user profiles. The document ID equals the Firebase Authentication UID of the user.

| Field | Type | Description |
| :--- | :--- | :--- |
| uid | String | Firebase Auth UID (also document ID) |
| email | String | User email address |
| displayName | String | Full name or business name |
| role | String | Enum: customer, provider, admin |
| isVerified | Boolean | Verification status |
| verificationStatus | String | pending, verified, rejected |
| photoURL | String | Profile image URL (Firebase Storage) |
| phoneNumber | String | Contact phone number |
| location / address | String | Primary service or residential address |
| bio / description | String | Provider biography |
| category | String | Provider service category |
| hourlyRate | Float | Provider hourly billing rate |
| serviceRadius | Float | Provider service coverage radius (km) |
| availability | Map | Day-keyed schedule of start/end times |
| services | Array | Array of service objects (name, rate, unit) |
| reviews | Array | Embedded review objects |
| rating | Float | Weighted average rating |
| jobsCompleted | Integer | Count of completed jobs |
| commissionBalance | Float | Outstanding commission owed to platform |
| savedProviders | Array | Array of provider UIDs saved by customer |
| completedTutorials | Map | Tutorial completion flags keyed by tutorial name |
| onboardingCompleted | Boolean | Whether onboarding was finished |
| createdAt | Timestamp/String | Account creation time |
| updatedAt | Timestamp | Last modification time |

### 3.7.2 Collection: requests
This collection stores all service requests posted by customers. Document IDs are auto-generated by Firestore.

| Field | Type | Description |
| :--- | :--- | :--- |
| title | String | Short title of the request |
| category | String | Service category |
| description | String | Detailed description |
| budget | Float | Customer's offered budget in Naira |
| urgency | String | low, medium, high |
| location | String | Human-readable service location |
| coordinates | Map | lat and lng fields for map rendering |
| image | String | Optional attachment image URL |
| status | String | Open, Pending, Scheduled, In Progress, Completed, Cancelled, Declined |
| customerId | String | UID reference to the customer |
| customerName | String | Denormalised customer display name |
| customerPhone | String | Denormalised customer phone |
| providerId | String | UID reference to assigned provider |
| providerName | String | Denormalised provider name |
| providerPhoto | String | Denormalised provider photo URL |
| providerPhone | String | Denormalised provider phone |
| timeline | Array | Array of TimelineEntry objects |
| review | Map | Embedded post-service review object |
| rejectionReason | String | Provider's stated reason for declining |
| rejectedBy | String | UID of provider who declined |
| finalAmount | Float | Actual amount paid at job completion |
| commission | Float | 10% commission charged on finalAmount |
| createdAt | Timestamp | Request creation time |
| updatedAt | Timestamp | Last status change time |
| completedAt | Timestamp | Job completion time |

### 3.7.3 Collection: verifications
This collection stores provider verification submission records. Document IDs are auto-generated.

| Field | Type | Description |
| :--- | :--- | :--- |
| userId | String | UID of the provider submitting |
| providerName | String | Provider display name |
| email | String | Provider email |
| service | String | Provider's declared service category |
| status | String | pending, approved, rejected |
| submittedAt | Timestamp | Submission time |
| reviewedAt | String | Timestamp of admin review |
| documents | Map | Keys are document type names; values are Firebase Storage URLs |

### 3.7.4 Collection: settings
This collection stores platform configuration. The primary document has the fixed ID `platform`.

| Field | Type | Description |
| :--- | :--- | :--- |
| commissionRate | Float | Percentage charged to providers (default 10) |
| enableNewRegistrations | Boolean | Whether new user signups are permitted |
| maintenanceMode | Boolean | Whether the platform is in maintenance state |
| supportEmail | String | Platform support contact email |
| maxJobRadius | Integer | Maximum allowable service radius in km |

### 3.7.5 Collection: support_tickets
This collection stores user-submitted support enquiries. Document IDs are auto-generated.

| Field | Type | Description |
| :--- | :--- | :--- |
| userId | String | UID of submitting user |
| userEmail | String | Submitting user's email |
| userName | String | Submitting user's display name |
| userRole | String | `customer` or `provider` |
| subject | String | Brief description of issue |
| category | String | Issue category (general, payment, account, technical, report) |
| message | String | Full message body |
| status | String | Open, In Progress, Resolved |
| createdAt | Timestamp | Submission time |

### 3.7.6 Data Relationships and Normalisation
Firestore is a document store and does not enforce referential integrity in the manner of a relational database. The schema employs a hybrid approach combining document referencing (where a `customerId` or `providerId` field stores a UID that can be used to retrieve a related document) and denormalisation (where `customerName`, `providerName`, and similar fields are duplicated into request documents for read performance, avoiding additional joins). This approach is standard practice in Firestore-based systems and optimises for the read-heavy workloads typical of dashboard views.

## 3.8 System Flow and Algorithms

### 3.8.1 Authentication Process
User registration is handled by the `register` function in `AuthContext.jsx`. The process first calls Firebase Authentication's `createUserWithEmailAndPassword`, which creates an account and returns a user credential object. The `updateProfile` Firebase function then sets the `displayName` field on the authentication record. A Firestore document is then created in the `users` collection using `setDoc`, with the document ID equal to the user UID. The `isVerified` field is set to `true` for customers (allowing immediate platform access) and `false` for providers (requiring administrative approval). The local `currentUser` state in the context is immediately updated with the merged authentication and Firestore data to prevent a race condition where navigation would occur before state propagation.
On login, `signInWithEmailAndPassword` authenticates the user, and the `onAuthStateChanged` listener in the `useEffect` hook of `AuthContext` fires, fetching the corresponding Firestore user document and merging it with the Firebase Auth user object. This enriched user object, including the `role` field, is stored in the `currentUser` state. The `Login.jsx` component's `useEffect` hook monitors `currentUser` and navigates to the role-appropriate dashboard when the state updates.

### 3.8.2 Commission Calculation Algorithm
When a provider completes a job via `handleInvoiceUpload` in `JobDetails.jsx`, the following computation occurs. The final amount collected from the customer is captured as a float. A 10% commission is calculated as `commission = finalAmount * 0.10`. Firestore's `increment(commission)` operation is used to atomically add this value to the provider's `commissionBalance` field, preventing concurrent write conflicts. The provider's `earnings` field is updated by `increment(finalAmount - commission)` to record net earnings. The `completedJobs` counter is incremented by one. The request document's status is set to `Completed` and the `finalAmount` and `commission` fields are recorded.
The provider's earnings dashboard in `Earnings.jsx` derives total earnings, monthly earnings, and weekly trend data through client-side computation over the `jobs` array provided by `DataContext`. For the weekly trend, job completion dates are extracted, their day-of-week index (0 through 6) is used to bin earnings into a seven-element array, and this array is rendered as a proportional bar chart.

### 3.8.3 Provider Verification Logic
Upon provider onboarding completion, `IdentityVerification.jsx` orchestrates a sequential asynchronous upload and write process. Each file (profile image, ID document, business licence) is uploaded to Firebase Storage using a path that incorporates the user's UID. Upon upload completion, the download URL is retrieved via `getDownloadURL`. These URLs, combined with all onboarding form data from `ProviderOnboardingContext`, are assembled into a provider data object. `updateDoc` writes this object to the provider's Firestore user document. Subsequently, a new document is created in the `verifications` collection containing a subset of the provider's information and a `status: 'pending'` field. The `ProtectedRoute` component then intercepts any non-onboarding navigation and redirects the provider to `/provider/onboarding/status` until an administrator approves the application.

### 3.8.4 Rating Recalculation Algorithm
When a customer submits a review via `ServiceReview.jsx`, the provider's current rating and review count are retrieved from their Firestore document. The new aggregate rating is computed as a weighted average: `newRating = ((currentRating * currentCount) + newRating) / (currentCount + 1)`. This value is written to the provider's rating field, and the new review object is appended to their reviews array via `arrayUnion`. The provider's `jobsCompleted` counter is also incremented.

## 3.9 Development Tools and Technologies
*   **React 19:** Core frontend framework for building the user interface through a component-based architecture.
*   **Vite 7.x:** Build tool providing fast hot module replacement during development and optimised ESM-based production bundles.
*   **Tailwind CSS 3.4:** Utility-first CSS framework used throughout all components for responsive, consistent styling without custom CSS files.
*   **Firebase 12.x:** Google's Backend-as-a-Service platform providing Authentication, Firestore, Storage, Analytics, and Vertex AI integration.
*   **React Router DOM 7.x:** Declarative client-side routing library for navigation between pages and for constructing the protected route hierarchy.
*   **Framer Motion 12.x:** Animation library used for page transitions via AnimatePresence and individual component entrance animations.
*   **Leaflet 1.9 with React-Leaflet 5.0:** Open-source mapping library used for interactive location selection in onboarding and request creation, and for displaying service location on job detail pages.
*   **Sonner 2.x:** Toast notification library for all user feedback messages.
*   **React Joyride 2.x:** Interactive product tour library used to deliver contextual onboarding tutorials to new users.
*   **React Hook Form 7.x:** Lightweight form state management library with validation support.
*   **Zod 4.x:** TypeScript-first schema validation library referenced in ESLint configuration and potentially form validation.
*   **date-fns 4.x:** Date formatting utility library used in request and activity date displays.
*   **Lucide React:** Icon library used in authentication pages.
*   **Vercel:** Frontend hosting and deployment platform providing global CDN distribution, automatic HTTPS, and SPA rewrite rules.
*   **Git/GitHub:** Version control and source code management (inferred from .gitignore and .vercelignore configuration files).
