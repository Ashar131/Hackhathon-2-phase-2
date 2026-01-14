# UI Design Guidelines: Todo Full-Stack Web Application

**Feature Branch**: `ui-design-guidelines-spec`
**Created**: 2026-01-08
**Status**: Draft
**Input**: UI specification requirements for premium frontend

## Visual Design Guidelines

### Color Palette

#### Neutral Colors
- **White**: #FFFFFF (primary background)
- **Gray-50**: #F9FAFB (secondary background)
- **Gray-100**: #F3F4F6 (subtle backgrounds)
- **Gray-200**: #E5E7EB (border color)
- **Gray-300**: #D1D5DB (medium border)
- **Gray-400**: #9CA3AF (medium emphasis text)
- **Gray-500**: #6B7280 (low emphasis text)
- **Gray-600**: #4B5563 (medium text)
- **Gray-700**: #374151 (high emphasis text)
- **Gray-800**: #1F2937 (primary text)
- **Gray-900**: #111827 (heading text)

#### Primary Accent Color
- **Primary-50**: #EFF6FF (lightest primary)
- **Primary-100**: #DBEAFE
- **Primary-200**: #BFDBFE
- **Primary-300**: #93C5FD
- **Primary-400**: #60A5FA
- **Primary-500**: #3B82F6 (main primary)
- **Primary-600**: #2563EB (hover state)
- **Primary-700**: #1D4ED8 (pressed state)
- **Primary-800**: #1E40AF
- **Primary-900**: #1E3A8A

#### Semantic Colors
- **Success-500**: #10B981 (success states)
- **Warning-500**: #F59E0B (warnings)
- **Error-500**: #EF4444 (errors, deletions)
- **Info-500**: #3B82F6 (information)

### Typography

#### Font Stack
- **Primary**: Inter, system-ui, sans-serif (fallback: Arial, sans-serif)
- **Code**: JetBrains Mono, SFMono-Regular, Consolas, monospace

#### Hierarchy
- **Heading 1**: 2.5rem (40px), font-weight 700, line-height 1.2
- **Heading 2**: 2rem (32px), font-weight 600, line-height 1.3
- **Heading 3**: 1.5rem (24px), font-weight 600, line-height 1.4
- **Heading 4**: 1.25rem (20px), font-weight 600, line-height 1.5
- **Body Large**: 1.125rem (18px), font-weight 400, line-height 1.6
- **Body Regular**: 1rem (16px), font-weight 400-500, line-height 1.6
- **Body Small**: 0.875rem (14px), font-weight 400-500, line-height 1.5
- **Caption**: 0.75rem (12px), font-weight 400, line-height 1.4

### Spacing System
Based on 4px grid system:
- **Space-1**: 0.25rem (4px)
- **Space-2**: 0.5rem (8px)
- **Space-3**: 0.75rem (12px)
- **Space-4**: 1rem (16px)
- **Space-5**: 1.25rem (20px)
- **Space-6**: 1.5rem (24px)
- **Space-8**: 2rem (32px)
- **Space-10**: 2.5rem (40px)
- **Space-12**: 3rem (48px)
- **Space-16**: 4rem (64px)
- **Space-20**: 5rem (80px)

### Border Radius
- **Radius-sm**: 0.125rem (2px) - Small elements
- **Radius-md**: 0.375rem (6px) - Buttons, inputs
- **Radius-lg**: 0.5rem (8px) - Cards, panels
- **Radius-xl**: 0.75rem (12px) - Large containers
- **Radius-full**: 9999px - Circular elements

### Shadows
- **Shadow-sm**: 0 1px 2px 0 rgba(0, 0, 0, 0.05) - Small elevation
- **Shadow**: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1) - Default elevation
- **Shadow-md**: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) - Cards, modals
- **Shadow-lg**: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) - High elevation
- **Shadow-xl**: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) - Popovers

### Visual Hierarchy

#### Information Density
- Prioritize content over chrome
- Use white space generously
- Apply progressive disclosure
- Group related information

#### Contrast Ratios
- **Text on background**: Minimum 4.5:1 (AA compliance)
- **Large text**: Minimum 3:1 (AA compliance)
- **Interface components**: Minimum 3:1 (AA compliance)

#### Visual Weight
- Use font weight for emphasis (not font size alone)
- Apply color strategically for attention
- Use spacing to separate sections
- Implement consistent alignment

### Iconography

#### Icon Set
- Use Lucide React or Heroicons for consistency
- Size variants: 16px, 20px, 24px (for interface elements)
- 32px for larger icons
- Consistent stroke width (1.5px)

#### Icon Usage
- Use icons for recognition, not decoration
- Maintain consistent style
- Ensure accessibility with proper labels
- Use system icons when available

### Motion Design

#### Animation Principles
- Purposeful: Animations should enhance UX, not distract
- Subtle: Use ease-in-out timing functions
- Fast: Keep durations under 300ms
- Meaningful: Transitions should reflect spatial relationships

#### Common Animations
- **Hover**: 150ms ease-in-out scale or color change
- **Focus**: 100ms ease-in-out border transition
- **Loading**: 1000ms linear infinite pulse
- **Transitions**: 200ms ease-in-out slide or fade
- **Feedback**: 150ms ease-out bounce for success states

#### Motion Guidelines
- Respect user preference for reduced motion (prefers-reduced-motion)
- Use transform and opacity for smooth performance
- Avoid flashing or strobing effects
- Maintain accessibility during animations

### Accessibility Guidelines

#### Color Accessibility
- Ensure sufficient contrast ratios
- Don't rely solely on color to convey information
- Test with color blindness simulators
- Provide alternative indicators (icons, text)

#### Interactive Elements
- Minimum 44px touch target size
- Visible focus states for keyboard navigation
- Clear hover states
- Proper ARIA attributes

#### Typography Accessibility
- Maintain readable font sizes
- Good line spacing (1.4-1.6 ratio)
- Justify text appropriately
- Support user font size preferences

### Responsive Design Principles

#### Mobile-First Approach
- Design for smallest screen first
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Thumb-friendly navigation

#### Breakpoint Strategy
- **Mobile**: Up to 767px
- **Tablet**: 768px to 1023px
- **Desktop**: 1024px and above
- **Large Desktop**: 1440px and above

#### Adaptive Patterns
- Content priority: What's most important on small screens?
- Layout flexibility: How does layout adapt?
- Interaction changes: How do interactions differ?
- Performance: How does performance vary by device?

### Component Design Patterns

#### Button Design
- Consistent padding (typically 0.75rem 1rem)
- Clear visual feedback on interaction
- Appropriate sizing for touch targets
- Hierarchical styling (primary, secondary, etc.)

#### Form Design
- Consistent spacing between elements
- Clear labeling and instructions
- Immediate validation feedback
- Logical grouping of related fields

#### Navigation Design
- Clear current page indication
- Consistent placement of navigation elements
- Intuitive information architecture
- Progressive disclosure for complex navigation

### Brand Personality
- **Professional**: Clean, uncluttered interfaces
- **Approachable**: Friendly but not childish
- **Efficient**: Clear pathways to accomplish tasks
- **Trustworthy**: Consistent, reliable interactions
- **Modern**: Contemporary design patterns

### Quality Standards

#### Pixel Perfection
- Consistent spacing and alignment
- Properly aligned elements
- No visual glitches or misalignments
- Consistent styling across components

#### Performance Considerations
- Optimize images and assets
- Efficient CSS and JavaScript
- Smooth animations (60fps)
- Fast loading times

#### Cross-Browser Compatibility
- Consistent appearance across browsers
- Proper fallbacks for modern features
- Responsive behavior across devices
- Accessible in all supported browsers