# Quote Generator Web App

A Next.js web application that generates motivational quotes based on user-entered topics. Built with ShadCN UI components and Tailwind CSS.

## Features

- **Topic-based Quote Search**: Enter a topic and get up to 3 relevant motivational quotes
- **ShadCN UI Form**: Clean, modern form interface with Input and Button components  
- **Local JSON Data**: Quotes stored in a local JSON file for fast access
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS

## Available Topics

The app currently includes quotes for the following topics:
- **success**: Quotes about achieving success and overcoming challenges
- **life**: Inspirational quotes about life and purpose
- **motivation**: General motivational quotes to inspire action

## Getting Started

### Prerequisites
- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment-1
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

This app is ready to be deployed to Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with a single click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with ShadCN UI variables
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── components/
│   ├── ui/                 # ShadCN UI components
│   │   ├── button.tsx      # Button component
│   │   └── input.tsx       # Input component
│   └── QuoteForm.tsx       # Main quote form component
├── data/
│   └── quotes.json         # Local quote data
└── lib/
    └── utils.ts            # Utility functions
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful, accessible React components
- **React 19** - Latest React features

## Adding More Quotes

To add more quotes, edit the `src/data/quotes.json` file:

```json
[
  {
    "topic": "new-topic",
    "text": "Your inspiring quote here."
  }
]
```

## License

This project is open source and available under the [MIT License](LICENSE).
