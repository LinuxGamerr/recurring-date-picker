# Recurring Date Picker Component

A customizable and reusable React component for selecting recurring dates, inspired by popular task management applications. Built using **Next.js**, **Tailwind CSS**, and **shadcn/ui**, this component allows users to configure complex recurrence patterns and view them on a visual calendar.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Component Structure](#component-structure)
- [Customization](#customization)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

- **Flexible Recurrence Options**:
  - **Daily**: Recur every X days.
  - **Weekly**: Recur every X weeks on specific days (e.g., *every 2 weeks on Mon & Wed*).
  - **Monthly**:
    - On a specific day (e.g., *15th of each month*)
    - Using ordinal patterns (e.g., *second Tuesday of each month*)
  - **Yearly**:
    - On a specific date (e.g., *March 15th each year*)
    - Using ordinal patterns (e.g., *third Monday of March*)
- **Date Range**: Define a `startDate` and optional `endDate`.
- **Live Calendar Preview**: Instantly visualizes all recurring dates.
- **Responsive Design**: Mobile-friendly with TailwindCSS.
- **Modular & Reusable**: Easy to integrate into any React or Next.js project.

---

## Tech Stack

| Technology     | Usage                            |
|----------------|----------------------------------|
| Next.js        | Framework (App Router)           |
| React          | UI Library                       |
| Tailwind CSS   | Styling                          |
| shadcn/ui      | UI Components                    |
| date-fns       | Date calculations                |
| TypeScript     | Type Safety                      |

---

## Installation

### 1. **Clone & Copy Files**

- Copy the following files to your project:
  - `src/components/recurring-date-picker.tsx`
  - `src/components/date-range-selector.tsx`
  - `src/components/recurrence-options.tsx`
  - `src/components/calendar-preview.tsx`
  - `src/lib/recurrence-utils.ts`

### 2. **Install Dependencies**

Ensure you install the required packages:

```bash
npm install date-fns clsx tailwind-variants @radix-ui/react-popover
