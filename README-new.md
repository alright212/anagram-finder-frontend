# Estonian Anagram Finder - Frontend

A modern, responsive React frontend for the Estonian Anagram Finder API. Built with TypeScript, Chakra UI, and optimized for finding Estonian word anagrams.

## 🚀 Features

- **Fast Anagram Search**: Instant anagram detection with optimized algorithms
- **Multilingual Support**: Estonian, English, German, and French languages
- **Custom Word Database**: Import your own word lists in plain text or JSON format
- **Modern UI**: Built with Chakra UI and responsive design
- **Real-time Statistics**: View search performance and database statistics
- **Dark/Light Mode**: Automatic theme switching with system preference
- **Mobile-First**: Fully responsive design for all devices

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Chakra UI** for component library
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **i18next** for internationalization
- **Axios** for API communication
- **Vite** for fast development and building

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Estonian Anagram Finder API running (see `anagram-finder-api/` folder)

## 🔧 Installation

1. **Clone and setup**:

   ```bash
   git clone <repository-url>
   cd anagram-finder-frontend
   npm install
   ```

2. **Configure environment**:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your API URL:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:5173
   ```

## 🌐 API Integration

This frontend interfaces with the Laravel API located in the `anagram-finder-api/` directory. Make sure the API is running before starting the frontend.

### API Endpoints Used:

- `GET /api/v1/wordbase/status` - Get wordbase status
- `POST /api/v1/wordbase/import` - Import word lists
- `GET /api/v1/anagrams/{word}` - Search for anagrams
- `GET /api/v1/anagrams/stats` - Get anagram statistics
- `GET /api/v1/locale/info` - Get language info
- `GET /api/v1/locale/translations/{namespace}` - Get translations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout/         # App layout components
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── AnagramSearchPage.tsx
│   ├── WordbaseImportPage.tsx
│   └── AboutPage.tsx
├── context/            # React Context providers
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── theme/              # Chakra UI theme configuration
├── i18n/               # Internationalization config
└── App.tsx             # Main app component
```

## 🎨 Design System

The app uses Estonian flag colors as the primary design system:

- **Primary Blue**: `#0072CE` (Estonian flag blue)
- **Secondary Black**: `#000000` (Estonian flag black)
- **Accent White**: `#FFFFFF` (Estonian flag white)
- **Additional Colors**: Teal, Orange, Green, Purple for accents

## 🌍 Internationalization

Supports multiple languages with easy addition of new translations:

- **Estonian (et)**: Primary language
- **English (en)**: Fallback language
- **German (de)**: Coming soon
- **French (fr)**: Coming soon

Add new translations in `src/i18n/config.ts`.

## 🔨 Available Scripts

- `npm run dev` - Start development server with host access
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Check TypeScript types

## 📱 Usage

### 1. Import Word Database

- Navigate to **Import** page
- Choose format (Plain Text or JSON)
- Select language
- Paste your word list
- Click "Import Words"

### 2. Search for Anagrams

- Go to **Search** page
- Enter an Estonian word
- View results with statistics
- Click on anagrams to search further

### 3. View Statistics

- Check **Home** page for database stats
- View search performance metrics
- Monitor word count and anagram data

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1

# App Configuration
VITE_APP_NAME="Estonian Anagram Finder"
VITE_APP_VERSION="1.0.0"

# Development
VITE_DEBUG=true
```

### API URL Setup

Update the API base URL in `.env` to match your Laravel API:

- **Local development**: `http://localhost:8000/api/v1`
- **Production**: `https://your-api-domain.com/api/v1`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

- **Issues**: Create an issue in the repository
- **Documentation**: Check the API documentation at `/api/documentation`
- **Estonian Language**: Built for the Estonian language community

## 🙏 Acknowledgments

- Estonian language community
- Laravel framework
- React and Chakra UI teams
- Open source contributors

---

Made with ❤️ for the Estonian language community
