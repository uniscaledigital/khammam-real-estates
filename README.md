# Khammam Real Estates

Welcome to the **Khammam Real Estates** official website project. This is a modern, premium web application built to showcase verified residential plots, independent houses, agricultural lands, villas, apartments, and commercial properties across Khammam.

## Features

- **Premium Luxury Design:** A highly curated, responsive layout utilizing modern aesthetics (gold gradients, dark/cream modes, sophisticated typography).
- **Curated Property & Project Catalogs:** Dedicated showcase pages for individual properties and large-scale DTCP-approved layouts.
- **Dynamic Routing:** Built with TanStack Router for instantaneous, single-page application navigation.
- **Fully Responsive:** Flawless experience on Desktop, Tablet, and Mobile devices.
- **Smart Search System:** Advanced property filtering functionality built into the Hero component.
- **Floating Quick Actions:** Sticky, accessible contact buttons for instant WhatsApp messaging and direct calling.

## Tech Stack

- **Framework:** React + Vite
- **Routing:** TanStack Router
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** Tailwind CSS + custom aesthetic tokens
- **Icons:** Lucide React
- **Language:** TypeScript

## Folder Structure

```
src/
├── assets/         # Static assets, fonts
├── components/     # Reusable UI components (buttons, headers, footers)
├── hooks/          # Custom React hooks
├── lib/            # Utilities, mock data, API functions
├── routes/         # TanStack Router page definitions
├── styles/         # Global CSS and Tailwind configurations
```

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/khammam-real-estates.git
   cd khammam-real-estates
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and configure it as needed.
   ```bash
   cp .env.example .env
   ```

## Development Commands

To run the development server locally:
```bash
npm run dev
```

To type-check the project:
```bash
npm run tsc
```

## Build Commands

To build the project for production:
```bash
npm run build
```
This command compiles and minifies all assets into the `dist` directory.

## Deployment Instructions (Vercel)

This project is perfectly optimized for immediate deployment on Vercel.

1. Connect your GitHub repository to Vercel.
2. Ensure the framework preset is automatically detected as **Vite**.
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`
6. Click **Deploy**.

A `vercel.json` file is already included to properly handle SPA routing logic.

## License
All rights reserved. © Khammam Real Estates.

## Contact Information
- **Phone:** +91 8186871820
- **Email:** gudepurajesh20@gmail.com
- **Office Location:** Khammam, Telangana
