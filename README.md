# Chore Chat 🏠

A modern, family-friendly web application designed to make household chore management fun and organized. Built with a beautiful, mobile-first UI that feels like a contemporary task management app.

## ✨ Key Features

- **👨‍👩‍👧‍👦 Family Management**: Create and manage family groups with role-based access
- **📋 Smart Chore Assignment**: Create, assign, and track chores with due dates and schedules
- **💰 Chore Bank System**: Track monetary rewards and deductions for completed tasks
- **📱 Modern UI/UX**: Mobile-first design with glassmorphism effects and smooth animations
- **🔔 SMS Reminders**: Automated notifications for upcoming chores (coming soon)
- **📊 Analytics Dashboard**: Family statistics and progress tracking
- **🔍 Observability**: Integrated OpenTelemetry and Prometheus for monitoring

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-like effects with backdrop blur
- **Gradient Animations**: Beautiful animated backgrounds and interactive elements
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Dark/Light Themes**: Adaptive interface that looks great in any lighting
- **Smooth Animations**: Micro-interactions that make the app feel alive

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router for modern web development
- **TypeScript**: Strongly typed JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Prisma**: Modern database toolkit and ORM
- **SQLite**: Lightweight database for development
- **OpenTelemetry**: Observability and monitoring
- **Prometheus**: Metrics collection and monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chore-chat.git
   cd chore-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
```

## Database Configuration

### Prisma Schema

The database schema includes models for `Family`, `Member`, `Chore`, and `ChoreBankTransaction`. Relationships are defined to manage family members, chores, and transactions.

### Running Migrations

To apply migrations:

```bash
npx prisma migrate dev
```

## API Endpoints

### Family API

- **POST /api/family**: Create a new family.
- **GET /api/family**: Fetch all families.
- **PUT /api/family**: Update recurring expenses for a member.
- **POST /api/family (type=transaction)**: Create a chore bank transaction.
- **GET /api/family (type=transactions)**: Fetch transaction history.
- **POST /api/family (type=recurring-expenses)**: Deduct recurring expenses.

### Chores API

- **POST /api/chores**: Create a new chore.
- **GET /api/chores**: Fetch all chores.
- **PUT /api/chores**: Update a chore.
- **DELETE /api/chores**: Delete a chore.

## Observability

### OpenTelemetry

Integrated for tracing and logging. View traces using the OpenTelemetry Collector.

### Prometheus

Configured to pull metrics from port `4320`. View metrics using Prometheus.

## Deployment

### Containerization

The application is containerized using Docker. Use the following command to start the containers:

```bash
docker-compose up
```

### Production Deployment

Ensure all environment variables are set and use a production-ready database.

## Future Features

- Integration with SMS APIs for reminders.
- User authentication for parents and kids.
- Dashboard for tracking chore completion.

## Contributing

Feel free to submit issues and pull requests to improve the application.
