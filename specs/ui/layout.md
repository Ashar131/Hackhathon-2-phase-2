# UI Layout Specification: Todo Full-Stack Web Application

**Feature Branch**: `ui-layout-spec`
**Created**: 2026-01-08
**Status**: Draft
**Input**: UI specification requirements for premium frontend

## Layout Specifications

### Overall Layout Structure

#### AppShell Layout
**Visual Intent**: Consistent structure across authenticated pages with navigation and content areas

**Grid Structure**:
```
┌─────────────────────────────┐
│ Header (Navbar)             │
├─────────────────────────────┤
│         │                   │
│ Sidebar │    Main Content   │
│         │                   │
└─────────────────────────────┘
```

**Responsive Behavior**:
- Desktop (≥1024px): Full sidebar visible, content area flexes
- Tablet (768px-1023px): Collapsible sidebar (starts collapsed)
- Mobile (<768px): Header only, sidebar becomes overlay drawer

**Dimensions**:
- Sidebar width: 280px (expanded), 80px (collapsed), 300px (mobile overlay)
- Header height: 64px
- Content padding: 24px on desktop, 16px on mobile
- Gutter: 16px between sidebar and content

**Z-Index Strategy**:
- Header: 50
- Sidebar: 40 (39 when collapsed)
- Modals: 50+
- Notifications: 60+
- Overlay/Backdrop: 45

### Page-Specific Layouts

#### Authentication Pages (/login, /signup)
**Visual Intent**: Focused, centered experience with minimal distractions

**Grid Structure**:
```
┌─────────────────────────────┐
│         Branding            │
├─────────────────────────────┤
│                             │
│        Auth Card            │
│                             │
└─────────────────────────────┘
```

**Container**:
- Centered max-width container: 400px
- Vertical padding: 48px
- Horizontal padding: 24px
- Card with shadow and rounded corners

**Content Flow**:
- Header with logo/title (centered)
- Main form area with consistent spacing
- Footer links (sign up/login) below form

**Responsive Behavior**:
- Mobile: Full width with 16px horizontal padding
- Tablet: 90% width up to 400px max
- Desktop: Centered 400px container

#### Dashboard Page (/dashboard)
**Visual Intent**: Organized information architecture with clear sections

**Grid Structure**:
```
┌─────────────────────────────┐
│ Header                      │
├─────────────────────────────┤
│         │                   │
│ Sidebar │    Dashboard      │
│         │                   │
└─────────────────────────────┘
```

**Dashboard Grid**:
- Summary cards: 2x2 grid on desktop (responsive to 1x2 on tablet)
- Recent activity: Full width below summary cards
- Upcoming tasks: Full width in sidebar or below main content

**Container Specifications**:
- Main content padding: 24px
- Card spacing: 16px between cards
- Max container width: 1200px (centered)

**Responsive Behavior**:
- Desktop: Grid layout with multiple columns
- Tablet: Single column layout
- Mobile: Stacked single column with reduced padding

#### Tasks List Page (/tasks)
**Visual Intent**: Clean, scannable list with clear actions and filtering

**Grid Structure**:
```
┌─────────────────────────────┐
│ Header                      │
├─────────────────────────────┤
│         │                   │
│ Sidebar │    Task List      │
│         │                   │
└─────────────────────────────┘
```

**Task List Container**:
- Header area with page title and create button (sticky)
- Filters/search area below header
- Task list with consistent vertical rhythm
- Pagination controls at bottom

**Header Area Layout**:
- Left: Page title (h1)
- Right: Primary action button (Create Task)
- Flex layout with proper spacing

**Filter Area Layout**:
- Left: Search input
- Right: Filter dropdowns (status, priority, etc.)
- Responsive wrapping on small screens

**Responsive Behavior**:
- Desktop: All filters visible, create button prominent
- Tablet: Filters wrap, create button becomes floating action button (optional)
- Mobile: Search expands full width, filters in dropdown menu

#### Task Detail Page (/tasks/[id])
**Visual Intent**: Focused editing experience with clear content hierarchy

**Grid Structure**:
```
┌─────────────────────────────┐
│ Header                      │
├─────────────────────────────┤
│         │                   │
│ Sidebar │    Task Detail    │
│         │                   │
└─────────────────────────────┘
```

**Task Detail Layout**:
- Title field: Large, prominent at top
- Form sections: Vertically stacked with clear spacing
- Action buttons: Fixed position or at bottom
- Metadata: Subtle placement (created/updated dates)

**Container Specifications**:
- Max width: 800px (centered)
- Form spacing: 24px between sections
- Action button spacing: 16px apart

**Responsive Behavior**:
- Desktop: Full-width form elements
- Mobile: Full-width with reduced padding
- Action buttons stack vertically on small screens

### Component Layout Specifications

#### Card Components
**Visual Intent**: Contained content areas with consistent styling

**Dimensions**:
- Padding: 24px
- Border-radius: 8px
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Border: 1px solid rgba(0, 0, 0, 0.05)

**Internal Layout**:
- Header: Title with optional actions (flex row)
- Body: Content with consistent spacing
- Footer: Actions or metadata (optional)

#### Form Layout
**Visual Intent**: Consistent form structure with proper spacing

**Field Spacing**:
- Vertical spacing: 16px between fields
- Horizontal spacing: 12px for inline elements
- Label to input: 8px
- Input height: 40px minimum

**Section Spacing**:
- Between form sections: 24px
- Section headers: Bold typography with 16px bottom margin

#### List Layout
**Visual Intent**: Scannable list items with consistent height and spacing

**Item Dimensions**:
- Height: 64px minimum
- Padding: 16px horizontal, 12px vertical
- Border-bottom: 1px solid rgba(0, 0, 0, 0.05)

**Item Internal Layout**:
- Left: Checkbox or icon
- Center: Content (title, description)
- Right: Actions or metadata

### Responsive Grid System

#### Breakpoints
- Mobile: `<768px`
- Tablet: `768px - 1023px`
- Desktop: `≥1024px`
- Large Desktop: `≥1440px`

#### Container Widths
- Mobile: 100% with 16px padding
- Tablet: 90% with 24px padding (max 768px)
- Desktop: 90% with 32px padding (max 1200px)
- Large Desktop: 80% with 32px padding (max 1400px)

#### Grid Columns
- Mobile: Single column layout
- Tablet: 2-column grid for dashboard cards
- Desktop: 3-4 column grid depending on content
- Flexible gutters: 16px on mobile, 24px on desktop

### Spacing System
Using Tailwind spacing scale (rem units):
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 10: 2.5rem (40px)
- 12: 3rem (48px)

### Typography Hierarchy

#### Desktop
- h1: 2.5rem (40px), font-weight 700
- h2: 2rem (32px), font-weight 600
- h3: 1.5rem (24px), font-weight 600
- h4: 1.25rem (20px), font-weight 600
- Body: 1rem (16px), font-weight 400-500
- Small: 0.875rem (14px), font-weight 400

#### Mobile Adjustments
- Reduce all sizes by 0.25rem for better readability
- Maintain weight hierarchy

### Z-Index Scale
- Base: 1-10 (normal stacking)
- Header: 50 (always visible)
- Sidebar: 40 (below header)
- Modals: 50+ (above header)
- Notifications: 60+ (topmost)
- Backdrop: 45 (between content and modal)

## Loading States Layout

#### Skeleton Loaders
- Cards: Grey rectangles with border-radius
- Text: Grey bars with appropriate dimensions
- Animation: Subtle fade between shades
- Duration: 1.5-2 seconds

#### Empty States
- Centered content in main area
- Illustration or icon
- Clear messaging
- Call-to-action button

## Accessibility Layout Considerations
- Minimum touch target: 44px x 44px
- Focus rings visible on all interactive elements
- Sufficient white space around elements
- Logical tab order matching visual flow
- Screen reader-friendly DOM structure