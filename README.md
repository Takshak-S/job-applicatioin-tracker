# Job Application Tracker

A high-performance, modern Kanban-style job application tracker built with Next.js 15+, Better-Auth, and MongoDB.

![Job Application Tracker](public/favicon.ico)

## 🚀 Features

- **Kanban Board**: Visualize your job search progress with a drag-and-drop interface.
- **Job Management**: easily create, update, and delete job applications.
- **Authentication**: Secure user sign-up and sign-in powered by `better-auth`.
- **Responsive Design**: Clean and modern UI that works on all devices.
- **Server Actions**: Fast and secure data mutations with Next.js Server Actions.
- **Auto-Initialization**: New users automatically get a default board with stages like "Applied", "Interviewing", "Offer", and "Rejected".

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State & DND**: [@dnd-kit](https://dnd-kit.com/) for drag-and-drop.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-application-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security

This project prioritizes security:
- **Dependency Auditing**: Regular vulnerability scans and updates.
- **Data Protection**: Ownership checks on all data mutations via Server Actions.
- **Secure Auth**: Industry-standard session management.
- **Self-Hosted DoS Protection**: Updated Next.js to address known DoS vulnerabilities in image optimization and PPR.

## 📖 Documentation

- [Architectural Overview](ARCHITECTURAL_OVERVIEW.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 📄 License

This project is licensed under the MIT License.
