# Chore Chat Refinement TODO
A consolidated checklist to systematically refine Chore Chat into a simple yet professional chore management app with built-in financial literacy features.

---

## 1. Design & Branding
- [ ] Define and apply a cohesive color palette & typography scale
- [ ] Add logo, favicons, and consistent branding assets (header, footer)
- [ ] Create a polished Landing/Hero section with clear value proposition
- [ ] Ensure responsive layouts for mobile, tablet, desktop
- [ ] Audit spacing, font sizes, and iconography for consistency

## 2. User Onboarding & Enrollment
- [ ] Streamline the enrollment flow: choose family name, roles, invite members
- [ ] Add progress indicators & confirmation screens
- [ ] Implement email invitation links (optional)
- [ ] Validate form inputs and display friendly error messages

## 3. Family Dashboard & Member Management
- [ ] Enhance `family.tsx` to show member cards, completion stats, and chore bank balance
- [ ] Add ability to edit or remove a family member
- [ ] Display a summary of today’s chores, upcoming chores, and recent transactions
- [ ] Include a visual progress ring or bar for each child’s earnings goal

## 4. Chore Management
- [ ] Support editing, deleting, and filtering chores (by member, due date)
- [ ] Allow bulk completion or reassignment of chores
- [ ] Show a clear confirmation / toast on chore creation or completion
- [ ] Add calendar or timeline view option

## 5. Financial Transactions & Literacy
- [ ] Build a dedicated “Expenses” page to log spending separate from chores
- [ ] Enable offsetting expenses automatically when chores are completed
- [ ] Allow transaction editing and deletion from modal
- [ ] Implement monthly summary chart (earnings vs spending)
- [ ] Introduce simple lessons or tips tied to milestones (e.g., saving benefits)
- [ ] Add achievement badges and unlockable content for financial milestones

## 6. Styling & UI Polishing
- [ ] Finalize and standardize component styles (buttons, cards, inputs)
- [ ] Clean up glassmorphism usage; ensure contrast and accessibility
- [ ] Add smooth animations / transitions for key interactions
- [ ] Ensure high-contrast mode and reduced-motion compliance

## 7. Accessibility & Internationalization
- [ ] Audit for ARIA roles, labels, tab order, focus states
- [ ] Add language support / translation framework (i18n)
- [ ] Ensure color contrast meets WCAG AA or higher

## 8. Backend & Data Layer
- [ ] Strengthen API error handling & loading states across pages
- [ ] Add input validation on server (via Prisma / Zod)
- [ ] Seed development data for quick testing
- [ ] Consider WebSocket or polling for real-time updates

## 9. Testing & Quality
- [ ] Write unit tests for key components (ChoreList, TransactionModal, MemberCard)
- [ ] Add integration tests covering the onboarding → chores → transaction flow
- [ ] Configure E2E tests (Cypress or Playwright)
- [ ] Enforce linting and formatting in CI (ESLint, Prettier)

## 10. CI/CD & Documentation
- [ ] Configure GitHub Actions for build, test, lint on PRs
- [ ] Add deployment workflow (Vercel or Azure Static Web Apps)
- [ ] Update README with project overview, setup instructions, env variables
- [ ] Add CONTRIBUTING guidelines and code style notes

## 11. Architecture & Scalability
- [ ] Establish clear folder structure: separate domain (models/services), UI (components/pages), data (hooks/api) layers
- [ ] Organize code by **Clean Architecture** layers:
  - **Domain**: Entities, Value Objects, Domain Services, Interfaces (repositories)
  - **Application**: Use Cases / Application Services, DTOs, Validators
  - **Interface Adapters**: Controllers, Repositories Implementations, API clients
  - **Frameworks & Drivers**: Next.js pages, React components, Prisma, infrastructure
- [ ] Introduce React Context or state management (e.g., React Query) for global data and caching
- [ ] Define **Bounded Contexts** for each domain area (Family, Chores, Transactions)
- [ ] Place each context under its own folder, e.g. `src/domain/family`, `src/application/chores`
- [ ] Enforce API contracts and validation using Zod or similar for both frontend and backend
- [ ] Use **Repository Interfaces** in domain layer and provide concrete implementations in infrastructure layer
- [ ] Create service/repository layer for all data operations to decouple from direct fetch calls
- [ ] Follow **Dependency Rule**: inner layers never depend on outer layers; enforce via import conventions or lint rules
- [ ] Aim for **>80% unit test coverage** in domain and application layers; use test doubles (mocks/fakes) for dependencies
- [ ] Implement centralized error handling and logging (e.g., via `logger.ts` and telemetry)
- [ ] Configure environment-specific settings and secure secret management
- [ ] Add integration with monitoring/tracing (OpenTelemetry, Azure Application Insights)
- [ ] Design API versioning or feature flags for future expansion
- [ ] Plan for modularization or monorepo split as features grow
- [ ] Write architectural documentation and update onboarding guides

## 12. Implementation Steps
- [x] Create a Dependency Injection container (`src/infrastructure/di.ts`) to wire repositories and use-cases
- [x] Update API route handler (`src/pages/api/chores.ts`) to resolve use-cases from DI container instead of direct Prisma calls
- [ ] Update API route handler (`src/pages/api/family.ts`) to resolve use-cases from DI container instead of direct Prisma calls
- [x] Implement application layer services in `src/hooks/api`: create `useChores` and `useFamily` hooks using React Query
- [ ] Refactor UI components and pages to consume `useChores` and `useFamily` hooks instead of manual fetch calls
- [x] Configure React Query provider at `_app.tsx` and set up global error and loading boundaries
- [ ] Write unit tests for domain and application use-cases using mocks (Jest + ts-jest)
- [ ] Add lint rule or commit hook to enforce layers import (domain cannot import UI, etc.)

---

*This TODO will evolve as we identify more refinements. Feel free to group or reprioritize tasks based on milestones.*
