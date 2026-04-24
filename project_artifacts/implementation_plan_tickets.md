# Upcoming Races & Tickets Feature

This plan outlines the creation of a new section of the application where users can view upcoming races and explore ticket options. This lays the groundwork for future e-commerce functionality.

## Proposed Changes

### 1. Navigation Updates
#### [MODIFY] [src/app/page.tsx](file:///c:/Users/samph/.gemini/antigravity/scratch/f1-ai-app/src/app/page.tsx)
- Add a "Tickets" link to the main navigation header.

### 2. Main Tickets Page (Race Selection)
#### [NEW] [src/app/tickets/page.tsx](file:///c:/Users/samph/.gemini/antigravity/scratch/f1-ai-app/src/app/tickets/page.tsx)
#### [NEW] [src/app/tickets/TicketsClient.tsx](file:///c:/Users/samph/.gemini/antigravity/scratch/f1-ai-app/src/app/tickets/TicketsClient.tsx)
- Create a new page dedicated to displaying the season's schedule.
- Fetch the race schedule using our existing Jolpica API integration.
- Filter the schedule to prominently display upcoming races.
- Present each race as an interactive card displaying the Grand Prix name, circuit, date, and location.
- Clicking a race card will navigate the user to the specific ticket details page for that race.

### 3. Individual Race Ticket Page (E-commerce Prep)
#### [NEW] [src/app/tickets/[round]/page.tsx](file:///c:/Users/samph/.gemini/antigravity/scratch/f1-ai-app/src/app/tickets/[round]/page.tsx)
- Create a dynamic route based on the race `round` number.
- Display detailed information about the selected race at the top of the page.
- Implement a mock e-commerce layout showcasing different ticket tiers (e.g., General Admission, Grandstand, VIP Paddock Club) with placeholder prices.
- Add "Select Tickets" / "Add to Cart" buttons that currently display a "Coming Soon" notification to prepare for future e-commerce integration.

## Open Questions

> [!IMPORTANT]
> **Ticket Data:** Since the Jolpica API only provides race data and not actual ticketing data, I will use placeholder ticket tiers and pricing for the e-commerce layout. Is this acceptable for now until we integrate a real e-commerce backend (like Stripe)?

## Verification Plan
1. Ensure the new "Tickets" navigation link appears and works.
2. Verify that the `/tickets` page successfully fetches and renders upcoming races from the Jolpica API.
3. Click on an upcoming race and verify that it correctly navigates to `/tickets/[round]`.
4. Check that the individual race page displays the correct race details and the mocked ticket tiers.
