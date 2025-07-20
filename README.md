# Recurring Date Picker Component

A customizable and reusable React component for selecting recurring dates, inspired by popular task management applications. Built with Next.js, Tailwind CSS, and `shadcn/ui`, this component offers a comprehensive solution for defining complex recurrence patterns and visualizing them on a calendar.

## Table of Contents

*   [Features](#features)
*   [Technical Stack](#technical-stack)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [Component Structure](#component-structure)
    *   [Integrating the Component](#integrating-the-component)
*   [Customization](#customization)
*   [Future Enhancements](#future-enhancements)
*   [License](#license)

## Features

*   **Flexible Recurrence Options**:
    *   **Daily**: Recur every X days.
    *   **Weekly**: Recur every X weeks, with selection of specific days of the week (e.g., "every 2 weeks on Monday and Wednesday").
    *   **Monthly**: Recur every X months, with options for:
        *   Specific day of the month (e.g., "the 15th of every month").
        *   Ordinal patterns (e.g., "the second Tuesday of every month").
    *   **Yearly**: Recur every X years, with options for:
        *   Specific date (e.g., "March 15th every year").
        *   Ordinal patterns (e.g., "the third Monday of March every year").
*   **Date Range Selection**: Define a start date and an optional end date for the recurrence.
*   **Mini Calendar Preview**: Visually highlights all calculated recurring dates on an interactive calendar, providing immediate feedback.
*   **Responsive Design**: Built with Tailwind CSS for a mobile-first and adaptive user experience across various screen sizes.
*   **Modular & Reusable**: Designed with clear separation of concerns, making it easy to integrate into any Next.js or React application.

## Technical Stack

*   **Framework**: Next.js (App Router)
*   **UI Library**: React
*   **Styling**: Tailwind CSS
*   **UI Components**: `shadcn/ui` (pre-installed and configured)
*   **Date Manipulation**: `date-fns`
*   **State Management**: React's `useState` hook (internal to the component)

## Installation

To integrate this component into your Next.js project:

1.  **Download the Code**: download the project archive and extract it.
2.  **Copy Files**:
    *   Copy the entire `components` directory (specifically `components/recurring-date-picker.tsx`, `components/date-range-selector.tsx`, `components/recurrence-options.tsx`, `components/calendar-preview.tsx`) into your project's `components` directory (e.g., `src/components/`).
    *   Copy the `lib/recurrence-utils.ts` file into your project's `lib` directory (e.g., `src/lib/`).
    *   Ensure your `tailwind.config.ts` and `app/globals.css` are set up for `shadcn/ui`
3.  **Install Dependencies**: Navigate to your project's root directory and install the required packages. The `package.json` included with the download will list all necessary dependencies.
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install