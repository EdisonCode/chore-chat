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

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables
4. Deploy automatically on every push

### Other Platforms

Chore Chat can be deployed to any platform that supports Next.js:
- **Netlify**: Static hosting with serverless functions
- **Railway**: Full-stack deployment with databases
- **Docker**: Use the included Dockerfile for containerized deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for families everywhere
- Inspired by modern task management apps
- Thanks to the Next.js and React communities

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

## Future Features

- Integration with SMS APIs for reminders.
- User authentication for parents and kids.
- Dashboard for tracking chore completion.

## Contributing

Feel free to submit issues and pull requests to improve the application.
