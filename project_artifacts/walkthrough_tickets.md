# Tickets & Upcoming Races Walkthrough

The brand new Tickets section has been fully integrated into the F1 AI Companion application! Here is a summary of what has been built and how to interact with it.

## What Was Added

1. **Navigation:** A new "Tickets" link has been securely added to your main navigation bar.
2. **Main Tickets Page (`/tickets`)**: 
   - Dynamically fetches the current Formula 1 season schedule from the Jolpica API on the server.
   - Automatically filters out past races, cleanly displaying only the **upcoming** races in a sleek grid layout.
   - Each race card is fully interactive, showing the Grand Prix name, date, and exact circuit location.
3. **Dynamic Race Ticketing (`/tickets/[round]`)**:
   - Each race connects to its own dynamic URL route.
   - Displays a beautifully mocked e-commerce layout showcasing 3 distinct ticket tiers: **General Admission**, **Grandstand**, and **Paddock Club VIP**, complete with pricing and distinct features.
   - Includes interactive "Add to Cart" buttons that currently trigger an alert as a placeholder for your future e-commerce logic (like Stripe checkout).

## How to Test It

1. Refresh your main app homepage.
2. Click **Tickets** in the top navigation bar.
3. Browse the grid of upcoming races. Notice the responsive hover animations on the cards!
4. Click on any specific race card to view its individual ticketing page.
5. Review the ticket tier pricing and feature lists.
6. Click any **Add to Cart** button to verify the frontend interactivity is wired up correctly!

> [!TIP]
> The data fetching on these pages uses Next.js server components with a built-in 1-hour cache. This ensures extremely fast load times for your users without unnecessarily hitting the Jolpica API on every single page load!
