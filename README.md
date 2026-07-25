# the-wild-oasis

An internal hotel-management dashboard for a small boutique hotel — cabins, bookings, check-in/out, and sales analytics — built with React, React Query and Supabase.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-backend-3ECF8E?logo=supabase&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-v4-FF4154?logo=reactquery&logoColor=white)

## Overview

The Wild Oasis is a staff-facing admin application, not a guest booking site.
Hotel employees log in to manage the property's cabins, work through the day's
arrivals and departures, and review performance.

What it does:

- **Cabins** — full CRUD with image upload to Supabase Storage, plus duplication, filtering (all / with discount / no discount) and sorting.
- **Bookings** — a paginated, server-filtered and server-sorted table, with a detail view per reservation.
- **Check-in / check-out** — confirm a guest's arrival, optionally adding breakfast to the bill, and check them out on departure. `TodayActivity` surfaces the arrivals and departures due today.
- **Dashboard** — statistics plus a Recharts sales area chart and a stay-duration pie chart, filterable over the last 7, 30 or 90 days.
- **Settings** — a single-row settings table holding minimum/maximum nights per booking, maximum guests per booking and the breakfast price.
- **Authentication** — Supabase Auth. Every route except `/login` sits behind `ProtectedRoute`; existing staff can create new user accounts from within the app.
- **Dark mode** — a `DarkModeContext` toggling CSS custom properties, persisted to `localStorage` via a `useLocalStorageState` hook.

Architecturally, it leans on a few consistent patterns: React Query owns all
server state (with a 60-second `staleTime`), each feature folder pairs its
components with its own custom hooks, `styled-components` handles styling
through a global CSS-variable theme, and compound components (`Table`, `Menus`,
`Modal`) back the reusable UI layer.

## Requirements

- Node.js 18+
- npm
- A Supabase project with the expected tables and storage buckets (see [Configuration](#configuration))

## Installation

```bash
git clone https://github.com/nizar-ing/the-wild-oasis.git
cd the-wild-oasis
npm install
npm run dev
```

Vite serves the app on <http://localhost:5173> by default.

Because every route is protected, you need a user in Supabase Auth before you
can get past `/login`. Create the first one from the Supabase dashboard;
afterwards, staff can add colleagues from **Users** inside the app.

### Seeding sample data

`src/data/Uploader.jsx` is mounted in the sidebar during development. Its
buttons wipe and repopulate the `guests`, `cabins` and `bookings` tables from
the local sample data in `src/data/`. Remove the `<Uploader />` from
`src/ui/Sidebar.jsx` before deploying — it deletes live rows.

## Usage

After logging in you land on `/dashboard`. From there:

- **Cabins** — add a cabin with a name, capacity, price, discount, description and photo. Editing and duplicating reuse the same form.
- **Bookings** — filter by status, sort, page through results, and open a booking to check the guest in or out.
- **Check in** — `/checkin/:bookingId` confirms payment and optionally adds breakfast for the stay before marking the booking as checked in.
- **Settings** — adjust booking rules; changes are written straight back to the single settings row.
- **Account** — update your own name, avatar and password.

Calling the data layer directly:

```js
import { getBookings } from "./services/apiBookings";

const { data, count } = await getBookings({
  filter: { field: "status", value: "unconfirmed" },
  sortBy: { field: "startDate", direction: "desc" },
  page: 1,
});
```

### Routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Stats, sales chart, stay-duration chart, today's activity |
| `/bookings` | Paginated bookings table with filter and sort |
| `/bookings/:bookingId` | Booking detail |
| `/checkin/:bookingId` | Check-in flow |
| `/cabins` | Cabin management |
| `/users` | Create a new staff user |
| `/settings` | Hotel-wide booking rules |
| `/account` | Current user's profile and password |
| `/login` | Login (the only unprotected route) |
| `*` | `PageNotFound` |

### Data layer

| Module | Functions |
| --- | --- |
| `apiBookings.js` | `getBookings`, `getBooking`, `getBookingsAfterDate`, `getStaysAfterDate`, `getStaysTodayActivity`, `updateBooking`, `deleteBooking` |
| `apiCabins.js` | `getCabins`, `createOrEditCabin`, `deleteCabin` |
| `apiAuth.js` | `signup`, `login`, `getCurrentUser`, `logout`, `updateCurrentUser` |
| `apiSettings.js` | `getSettings`, `updateSetting` |

## Configuration

The Supabase URL and anon key are hard-coded in `src/services/supabase.js`;
there is no `.env` file and no `import.meta.env` usage. To point the app at your
own project, edit `supabaseUrl` and `supabaseKey` there — or, preferably, move
them to Vite environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

> The committed key is Supabase's **anon** key, which is designed to be public,
> so this is not a credential leak — but it does mean the app's security depends
> entirely on Row Level Security policies being correctly configured on the
> Supabase project. Verify RLS is enabled on every table before exposing this
> anywhere real.

Your Supabase project needs:

**Tables** — `cabins`, `bookings`, `guests`, and `settings` (a single row with
`id = 1`, holding `minBookingLength`, `maxBookingLength`, `maxGuestsPerBooking`
and `breakfastPrice`).

**Storage buckets** — `cabin-images` (public; cabin photos are read from
`{supabaseUrl}/storage/v1/object/public/cabin-images/…`) and `avatars` (user
profile images).

**Other constants** — `PAGE_SIZE` in `src/utils/constants.js` sets the bookings
page size (currently `10`).

## Project structure

```
src/
├── main.jsx
├── App.jsx                 # QueryClient, DarkModeProvider, GlobalStyles, router, Toaster
├── pages/                  # One thin component per route
├── features/               # Feature-sliced: components + their own hooks
│   ├── authentication/     # Login, signup, profile and password forms + hooks
│   ├── bookings/           # Table, row, detail, data box + hooks
│   ├── cabins/             # Table, row, create/edit form + hooks
│   ├── check-in-out/       # Check-in, checkout, today's activity + hooks
│   ├── dashboard/          # Stats, SalesChart, DurationChart, filter
│   ├── guests/             # Guest list and create form
│   └── settings/           # Settings form + hooks
├── services/               # Supabase client and the four API modules
├── ui/                     # Reusable presentational + compound components
│                           #   (Table, Menus, Modal, Form, Button, Sidebar, …)
├── context/                # DarkModeContext
├── hooks/                  # useLocalStorageState, useMoveBack, useOutsideClick
├── styles/GlobalStyles.js  # CSS custom properties, incl. the dark theme
├── utils/                  # constants.js, helpers.js
└── data/                   # Sample data + the Uploader dev tool
```

Some components have a `-v1` sibling (`CabinTable-v1.jsx`,
`CreateCabinForm-v1.jsx`, `UpdateSettingsForm-v1.jsx`) — earlier iterations kept
alongside the current version for reference. They are not imported anywhere.

The `features/guests/` components (`GuestList`, `GuestListItem`,
`CreateGuestForm`) are likewise not referenced by any route yet.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over `js,jsx` with `--max-warnings 0` |

## Contributing

Issues and pull requests are welcome. `npm run lint` runs with
`--max-warnings 0`, so please make sure it passes cleanly before opening a PR.
