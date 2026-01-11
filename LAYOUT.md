
# weglue-app

├── app/                # Expo Router directory (screens & layouts)
│   ├── (auth)/         # Login, Sign-up, University Verification
│   ├── (tabs)/         # Main App (Home, Clubs, Messaging, Profile)
│   ├── (admin)/        # Club Leader / Admin specific screens
│   └── _layout.tsx     # Global providers (Auth, QueryClient)
├── components/         # Reusable UI (Buttons, Cards, Modals)
├── hooks/              # Custom hooks (useAuth, useMessaging)
├── store/              # Zustand stores
├── utils/              # API helpers, Date formatting (date-fns)
└── constants/          # Colors, API Endpoints, Typography
