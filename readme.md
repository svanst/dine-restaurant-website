# Frontend Mentor - Dine Restaurant Website

This is my solution to the [Dine Website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/dine-restaurant-website-yAt7Vvxt7). Frontend Mentor challenges help you improve your coding skills by building realistic projects. The design is provided by Frontend Mentor, all code is written by me.

Live Site URL: https://dine-restaurant-website-flax.vercel.app

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements throughout the site
- See the correct content for the Family Gatherings, Special Events, and Social Events section when the user clicks each tab
- Receive an error message when the booking form is submitted if:
  - The `Name` or `Email Address` fields are empty
  - The `Email Address` is not formatted correctly
  - Any of the `Pick a date` or `Pick a time` fields are empty

### Screenshots of my implementation of the desktop layout

![](/screenshots/dine-desktop.png)
![](/screenshots/booking-desktop.png)

### Goals

My goals in taking on this challenge included the following:

- Create a two-page responsive website with tricky layout challenges (such as the hero section with multiple, partially overlapping elements and the decorative elements that are present in multiple places in the design).
- Write semantic and accessible HTML.
- Serve optimal images based on screen size and pixel density
- Work with JavaScript's constraint validation API and add more than just required validation checks. For example, I wanted to implement validation to check if the date/time for a booking was not in the past.
- Create custom components that match the provided design: a select component with icons, and a tabs component. Make them accessible, both for screen readers as well as for keyboard navigation.
- Use SCSS with mixins for media queries and share breakpoints between SCSS and JavaScript.
- Create and use a set of generic utility classes in addition to a set of specialized classes for more complex components.
