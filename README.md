# Amazing Smile Dental Care 🦷
> **Premier Dental Clinic in Ulhasnagar**  
> **Address**: Gol Maidan, Sidhi Vinayak Nagar, Ulhasnagar, Maharashtra 421002  
> **Doctors**: Dr. Manish Gangwani & Dr. Bhriti Gangwani

---

## 🌟 Overview
Official modern web application for **Amazing Smile Dental Care**, featuring:
- 📅 **Interactive Real-Time Appointment Booking System** with slot selection, patient intake, and printable booking slips.
- 👨‍⚕️ **Doctor & Clinic Portal** with schedule management, walk-in registration, and clinical notes export.
- 🏥 **High-Resolution Office & Operatory Visual Gallery** with treatment rooms, sterilization protocols, and digital imaging suites.
- 📍 **Location, Map & Commute Directions** with instant navigation links for patients visiting near Gol Maidan.
- 📱 **100% Responsive Design** built with React 19, Tailwind CSS v4, and Lucide icons.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deploying to GitHub Pages (Automatic)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`:

1. Push this repository to GitHub.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Every push to `main` will automatically build and publish your website to:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

Because `base: './'` is configured in `vite.config.ts`, all assets load cleanly without 404 errors!

---

## 🔐 Doctor Clinic Portal Credentials

To access the Doctor & Admin Portal:
- Click **"Clinic Portal"** in the top navigation or footer.
- **Username**: `dr.manish`
- **Password**: `SmileKalyan2026!`
- **Quick PIN**: `4213`
- Direct Developer Override is accessible via the "Developer Access" toggle.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Persistence**: LocalStorage with automatic in-memory fallback for sandboxed iframe environments
