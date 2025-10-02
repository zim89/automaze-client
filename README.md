# Automaze Client

A modern task management web application built with Next.js using Feature-Sliced Design architecture.

## 🚀 Key Features

- **Task Management**: Create, edit, delete and track tasks with advanced filtering
- **Categories**: Organize tasks by categories with color indicators
- **Priorities**: Set task priorities (1-10)
- **Due Dates**: Set and track task deadlines
- **Statistics Dashboard**: Real-time task completion progress and analytics
- **Advanced Table**: Sorting, filtering, and pagination with TanStack Table
- **Form Validation**: Client-side validation with Zod schemas
- **Responsive Design**: Full mobile device support
- **Dark Theme**: Seamless light/dark mode switching

## 🛠 Technology Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Library for building user interfaces
- **TypeScript** - Typed JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components

- **shadcn/ui** - Modern UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **next-themes** - Theme management
- **Sonner** - Toast notifications

### Forms & Validation

- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolver for RHF

### State Management & Data

- **TanStack Query v5** - Server state and caching
- **TanStack Table v8** - Powerful table with sorting, filtering, pagination
- **Axios** - HTTP client
- **nuqs** - Type-safe URL state management
- **date-fns** - Date manipulation library

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Bun** - JavaScript runtime and package manager

## 🏗 Architecture

The project uses **Feature-Sliced Design** methodology:

```
src/
├── app/                 # App Router pages and layouts
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── tasks/          # Tasks page
│   └── providers/      # App providers (Query, Theme)
├── entities/           # Business entities
│   ├── task/           # Task entity
│   │   ├── tasks-api.ts
│   │   ├── tasks-requests.ts
│   │   ├── tasks-types.ts
│   │   └── tasks-keys.ts
│   ├── category/       # Category entity
│   └── stat/           # Statistics entity
├── features/           # Features with business logic
│   ├── task/           # Task features
│   │   ├── model/      # Hooks (CRUD operations)
│   │   ├── ui/         # Components (forms, dialogs)
│   │   └── lib/        # Schemas and validation
│   ├── category/       # Category features
│   └── stat/           # Statistics features
│       ├── model/      # Stats hooks
│       └── ui/         # Stats components
├── shared/             # Reusable modules
│   ├── api/           # API client configuration
│   ├── components/    # UI components (shadcn/ui)
│   ├── constants/     # Application constants
│   └── utils/         # Utilities
└── widgets/           # Composite UI blocks
    ├── header.tsx
    ├── theme-switcher.tsx
    └── stats-card.tsx
```

## 📦 Installation & Setup

### Prerequisites

- **Bun** ^1.0.0
- **Node.js** ^18.0.0
- Running backend API (automaze-server)

### Install Dependencies

```bash
bun install
```

### Environment Setup

Create `.env.local` file (if needed for API URL):

```env
NEXT_PUBLIC_API_URL=http://localhost:4040
```

### Development

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
bun run build
bun run start
```

## 🎨 UI Components

The project includes ready-to-use UI components built with shadcn/ui:

### Form Components

- Form fields with validation
- Input, Select, Checkbox
- Date Picker with Calendar
- React Hook Form integration

### Data Display

- Advanced tables with TanStack Table
- Statistics cards and charts
- Progress indicators
- Skeleton loaders

### Overlays

- Dialogs and modal windows
- Alert dialogs for confirmations
- Dropdown menus
- Popovers

### Navigation

- Navigation menu
- Theme switcher
- Responsive header

All components are:

- ✅ Fully typed with TypeScript
- ✅ Accessible (ARIA attributes)
- ✅ Responsive
- ✅ Theme-aware (light/dark mode)

## 🔧 Scripts

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

## 🌐 API Integration

The application integrates with backend API using:

- **Axios** for HTTP requests
- **TanStack Query** for caching and state management
- **Query Keys** for cache invalidation
- **Optimistic Updates** for better UX
- **Type-safe** API client with TypeScript

### API Structure

```typescript
entities/task/
├── tasks-api.ts        # API class with methods and options
├── tasks-requests.ts   # HTTP request functions
├── tasks-keys.ts       # Query keys factory
└── tasks-types.ts      # TypeScript types

features/task/
├── model/              # React Query hooks
│   ├── use-tasks-data.ts    # Fetch tasks
│   ├── use-create-task.ts   # Create task
│   ├── use-update-task.ts   # Update task
│   └── use-delete-task.ts   # Delete task
└── lib/
    └── schemas.ts      # Zod validation schemas
```

## 📋 Form Validation

All forms use **Zod schemas** for validation:

```typescript
// features/task/lib/schemas.ts
export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  priority: z.number().min(1).max(10),
  categoryId: z.string().trim().optional(),
  dueDate: z.date().optional(),
})
```

Features:

- ✅ Automatic whitespace trimming
- ✅ Client-side validation
- ✅ Type-safe form data
- ✅ Real-time error messages
- ✅ Accessible error display

## 📊 Statistics Feature

Real-time statistics dashboard with:

- **Total Tasks** count
- **Completed Tasks** with completion rate
- **Pending Tasks** remaining
- **Overdue Tasks** past due date
- **Top Categories** by task count
- **Progress Bar** visual representation

All calculations are done on the server for optimal performance.

## 📱 Responsiveness

- **Mobile First** approach
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Touch-optimized interactions
- Collapsible navigation on mobile
- Optimized table view for small screens

## 🎯 Key Features Details

### Task Management

- Create tasks with validation
- Edit task details
- Delete with confirmation
- Quick toggle completion status
- Filter by status and category
- Search by title/description
- Sort by multiple fields

### Advanced Table

- Server-side pagination
- Multi-column sorting
- Real-time filtering
- Search functionality
- Responsive layout
- Action buttons per row

### Form Handling

- React Hook Form for performance
- Zod schema validation
- Accessible error messages
- Auto-focus on errors
- Loading states
- Success notifications

## 🔒 Type Safety

- **Full TypeScript** coverage
- **Zod schemas** for runtime validation
- **Type-safe** API responses
- **Inferred types** from schemas
- **Strict mode** enabled

## 🚀 Performance

- **Next.js 15** with App Router
- **Turbopack** for fast development builds
- **React 19** with concurrent features
- **Code splitting** automatic
- **Image optimization** built-in
- **TanStack Query** caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write TypeScript with strict mode
- Follow Feature-Sliced Design principles
- Export utilities with inline `export`

## 📄 License

This project is private and not intended for public use.
