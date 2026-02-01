# MERAZ 6.0 // Steampunk: Gears of Glory

Central India's largest Techno-Cultural Festival at **IIT Bhilai**.
This is the official web portal for Meraz 6.0, featuring a 3D interactive mascot, event registration, and a steampunk aesthetic.

![Meraz Preview](./public/assets/images/logo-placeholder.png)

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
-   **3D**: [React Three Fiber](https://docs.pmndrs.io/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei)
-   **Auth & Backend**: [Firebase v9](https://firebase.google.com/) (Authentication & Firestore)
-   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/harshtripathi272/meraz.git
cd meraz
npm install --legacy-peer-deps
```

---

## 🔐 Firebase Setup (Crucial Step)

The authentication system requires a Firebase project. Follow these steps carefully:

### Step A: Create a Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and name it `meraz-6`.
3.  Disable Google Analytics (optional, for simplicity) and click **Create Project**.

### Step B: Get Config Keys
1.  In your project dashboard, click the **Web Icon (</>)** in the center to add a web app.
2.  Nickname it `meraz-web` and click **Register app**.
3.  **COPY** the `const firebaseConfig = { ... }` object values shown on the screen. You will need these for the next step.

### Step C: Enable Authentication
1.  Go to **Build > Authentication** in the left sidebar.
2.  Click **Get Started**.
3.  **Sign-in method** tab:
    -   Enable **Email/Password**.
    -   (Optional) Enable **Google**: Click Google, enable it, and select your support email.
    -   (Optional) Enable **GitHub**: Requires a GitHub OAuth app (Instructions provided in Firebase modal).

---

## ⚙️ Environment Variables

1.  Rename the example env file (if present) or create a new one named `.env.local` in the root directory:

    ```bash
    cp .env.local.example .env.local
    # OR just create it manually
    touch .env.local
    ```

2.  Open `.env.local` and paste your Firebase keys from **Step B**. It should look exactly like this:

    ```env
    # .env.local
    
    NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (Your Key)
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meraz-6.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=meraz-6
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meraz-6.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
    NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
    ```

    > **Note**: Do not use quotes `""` around the values.

---

## 🏃‍♂️ Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

-   **Home**: Landing page with 3D mascot.
-   **Login**: `/login` (Try logging in with a test email!).
-   **Events**: `/events`.
-   **Passes**: `/passes`.

---

## 📁 Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── login/         # Login Page
│   ├── signup/        # Signup Page
│   ├── events/        # Events listing
│   └── page.tsx       # Homepage
├── components/
│   ├── features/      # Complex features (RobotMascot, ChatBot)
│   ├── home/          # Homepage sections (Hero, ScrollSequence)
│   └── layout/        # Navbar, Footer
├── context/           # React Context (AuthContext)
└── lib/
    ├── firebase.ts    # Firebase initialization
    └── data/          # Static data (events.ts, passes.ts)
```

## ⚠️ Troubleshooting

-   **"Auth/invalid-api-key" error**: You skipped the `.env.local` step or pasted invalid keys. Double-check **Step B** above.
-   **"Login Failed"**: Check if you enabled "Email/Password" provider in Firebase Console (**Step C**).
-   **3D Model not showing**: Ensure your browser supports WebGL.
