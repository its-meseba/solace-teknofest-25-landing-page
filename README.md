# Ochtarcus

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac) ![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-latest-gray)

Ochtarcus is a modern web application built with Next.js 15 that serves as a knowledge library with two primary features:

1. **Library**: Browse and filter educational content (blog posts and videos) by categories
2. **AI Chat**: Chat through the content database (future feature), rag, generative ai

## 🎨 Branding

- **Primary Color**: #E53935
- **Light Mode Background**: #f5f5ee 
- **Dark Mode**: Supported

## ✨ Features

### Library
- Browse a collection of educational blog posts and videos
- Filter content by type (video/blog) and categories
- View detailed content on dedicated pages with breadcrumb navigation
- Responsive design for all screen sizes
- YouTube video embeds for video content
- Markdown rendering for blog content with table of contents
- Dark/Light mode support

### AI Search (Coming Soon)
- Chat through all content using AI capabilities
- RAG based generative ai

## 🚀 Tech Stack

- **Next.js 15**: App Router, Server Components, built-in optimizations
- **React 19**: Latest React features
- **TypeScript 5**: Type safety and developer experience
- **Tailwind CSS 4**: Utility-first CSS
- **Shadcn UI**: High-quality, customizable UI components
- **ESLint & Prettier**: Code quality and formatting
- **Docker**: Containerization for deployment

## 📂 Project Structure

```
client/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── library/             # Library page
│   │   │   ├── blog-content/    # Blog content pages
│   │   │   │   └── [slug]/      # Dynamic blog content routes
│   │   │   ├── video-content/   # Video content pages
│   │   │   │   └── [slug]/      # Dynamic video content routes
│   │   ├── ai-search/           # AI Search page (future)
│   ├── components/              # React components
│   │   ├── common/              # Shared components
│   │   │   ├── nav-header.tsx   # Navigation header
│   │   │   ├── content-card.tsx # Content card component
│   │   │   └── ...
│   │   └── pages/               # Page-specific components
│   │       ├── library/         # Library page components
│   │       │   ├── LibraryMain.tsx    # Main library component
│   │       │   ├── BlogContentView.tsx # Blog content view
│   │       │   └── VideoContentView.tsx # Video content view
│   │       └── ai-search/       # AI Search components
│   ├── data/                    # Data sources
│   │   ├── blog-data.ts         # Blog content data
│   │   └── video-data.ts        # Video content data
│   ├── types/                   # TypeScript type definitions
│   ├── registry/                # Shadcn UI components
│   └── lib/                     # Utility functions
```

## 🏁 Getting Started

### Prerequisites

- **Node.js**: Version 20.18.0 or higher
- **Docker**: For containerized deployment (optional)

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/ochtarcus.git
    cd ochtarcus/client
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or with Yarn
    yarn install
    # or with pnpm
    pnpm install
    ```

3. **Run Development Server**:
    ```bash
    npm run dev
    # or with Yarn
    yarn dev
    # or with pnpm
    pnpm dev
    ```

4. **Build for Production**:
    ```bash
    npm run build
    ```

### 🐳 Docker Setup

To use Docker, make sure Docker is installed on your machine. Then, build and run the Docker container:

```bash
docker build . -t ochtarcus
docker run -p 3000:3000 ochtarcus
```

## 📚 Content Structure

### Blog Content
Blog posts are structured with:
- Title and description
- Authors
- Categories
- Table of contents
- Full content in markdown format

### Video Content
Video content includes:
- Title and description
- YouTube video embed
- Categories
- Transcript content

## 🔍 Filtering System

Content can be filtered by:
- Content type (video/blog)
- Categories (multiple selection supported)

### Video Categories
Categories include topics like Advisers, Applying to YC, Artificial Intelligence, Building Product, Fundraising, and many more.

### Blog Categories
Blog categories cover topics such as Academia to Startup, Building Product, CEO, CTO, Fundraising, Investors, and more.

## 💻 Development

For development, it's recommended to use VS Code with the following extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense

---

<p style="text-align: center;">Ochtarcus - Your Knowledge Library</p>
