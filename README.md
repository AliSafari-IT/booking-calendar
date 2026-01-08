# @asafarim/booking-calendar

Google Calendar-style booking UI for React. Built with TypeScript, Vite, and ASafariM design tokens.

![Booking Calendar](https://raw.githubusercontent.com/AliSafari-IT/booking-calendar/refs/heads/main/demo/public/booking-calendar.png)

## Installation

```bash
npm install @asafarim/booking-calendar
# or
pnpm add @asafarim/booking-calendar
```

## Quick Start

```tsx
import { BookingCalendar } from '@asafarim/booking-calendar';
import '@asafarim/booking-calendar/styles';

function App() {
  const [bookings, setBookings] = useState([]);

  const handleCreate = async (dto) => {
    const response = await fetch('/api/calendar/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    const newBooking = await response.json();
    setBookings([...bookings, newBooking]);
  };

  return (
    <BookingCalendar
      bookings={bookings}
      onCreateBooking={handleCreate}
      initialView="week"
    />
  );
}
```

## Features

- ✅ **Month/Week/Day views** - Switch between calendar views
- ✅ **Jump to Date** - Click month/year label to quickly navigate to any date
- ✅ **Click to create** - Click empty slot to create booking
- ✅ **Click to edit** - Click booking to edit details
- ✅ **Drag to move** - Drag bookings to reschedule
- ✅ **Drag to resize** - Adjust booking duration
- ✅ **Status badges** - Pending, Confirmed, Cancelled, Completed, NoShow
- ✅ **Delivery status** - Track notification delivery
- ✅ **Availability checking** - Validate time slots
- ✅ **Client details** - Display client info on bookings
- ✅ **Mobile-first responsive** - Works on 320px–4K screens
- ✅ **Dark theme** - Built-in dark mode with design tokens
- ✅ **Keyboard accessible** - Full keyboard navigation support
- ✅ **Modal dialogs** - Create/edit bookings with validation

## Jump to Date Modal

Click the month/year label in the header to open the Jump to Date modal. Navigate to any date using:

- Year input with +/- buttons
- 12-month grid selector
- Mini calendar with 6-week view

![Jump to Date Modal](https://raw.githubusercontent.com/AliSafari-IT/booking-calendar/refs/heads/main/demo/public/booking-calendar_jumptodate.png)

## API Integration

The component expects these FreelanceToolkit.Api endpoints:

```bash
GET    /api/calendar/bookings
POST   /api/calendar/bookings
PUT    /api/calendar/bookings/{id}
DELETE /api/calendar/bookings/{id}
POST   /api/calendar/bookings/check-availability
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `bookings` | `BookingEvent[]` | Yes | Array of bookings |
| `onCreateBooking` | `(dto) => Promise<void>` | No | Create handler |
| `onUpdateBooking` | `(id, dto) => Promise<void>` | No | Update handler |
| `onDeleteBooking` | `(id) => Promise<void>` | No | Delete handler |
| `onCheckAvailability` | `(dto) => Promise<AvailabilityResponse>` | No | Availability check |
| `initialView` | `'month' \| 'week' \| 'day'` | No | Default: 'week' |
| `initialDate` | `Date` | No | Default: today |

## Booking Type

```typescript
interface BookingEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed" | "NoShow";
  meetingLink?: string;
  location?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  deliveryStatus?: "Pending" | "Sent" | "Failed" | "Retrying";
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Styling

The component uses ASafariM design tokens for colors, spacing, and typography. All styles are mobile-first responsive and support dark theme.

Override CSS variables:

```css
.booking-calendar {
  --bc-bg: #0b0b10;
  --bc-surface: #111827;
  --bc-grid-line: #1f2933;
  --bc-text: #e5e7eb;
  --bc-muted: #9ca3af;
  --bc-accent: #3b82f6;
  --bc-danger: #ef4444;
  --bc-success: #22c55e;
  --bc-warning: #eab308;
  --bc-border-radius-sm: 4px;
  --bc-border-radius-md: 8px;
}
```

## Responsive Design

The calendar is built mobile-first and works seamlessly on all screen sizes:

- **Mobile (320–479px)**: Stacked header, compact buttons, sheet-style modals
- **Tablet (480–767px)**: Adjusted spacing, single-column form rows
- **Desktop (768px+)**: Full layout with side-by-side elements

## Accessibility

- Full keyboard navigation (Tab, Enter, Escape)
- ARIA labels on all interactive elements
- Focus-visible states for keyboard users
- Semantic HTML structure
- Color contrast compliant

## Development

```bash
# Install dependencies
pnpm install

# Run demo
pnpm demo

# Build package
pnpm build

# Build and deploy demo
pnpm deploy

# Release new version
pnpm release
```

## Components

- `BookingCalendar` - Main calendar component
- `MonthView` - Month view renderer
- `WeekView` - Week view renderer
- `DayView` - Day view renderer
- `BookingModal` - Create/edit booking modal
- `JumpToDateModal` - Date navigation modal
- `BookingStatusBadge` - Status indicator
- `DeliveryStatusBadge` - Delivery status indicator

## License

MIT © ASafariM
