# Spotter_Assessment

Responsive Google Flights clone built with React, using the SkyScrapper API (via RapidAPI) for flight data.

---

## Live Demo

[https://spotter-assessment-sage.vercel.app/](https://spotter-assessment-sage.vercel.app/)

## GitHub Repository

[https://github.com/arunsamy4444/Spotter_Assessment](https://github.com/arunsamy4444/Spotter_Assessment)

---

## Overview

This project is a React-based frontend assessment for the Spotter Front End Developer role. It replicates key Google Flights features using flight data fetched from the SkyScrapper API.

---

## API Usage & Limitations

The SkyScrapper API allows **only 20 requests per user per month** on the free tier, which is very restrictive for active development and testing.

To work around this limitation, the app uses **mocked flight data** that mimics the exact structure of the real API responses. This enables:

- Reliable UI development without hitting the API rate limits  
- Consistent data for testing and demonstration  
- Faster iterations without depending on live API availability  

---

## Features

- Responsive design matching Google Flights layout  
- Search flights by origin, destination, and date  
- Displays flight options with relevant details  
- Clean UI with loading spinners and error toasts planned for next iterations  

---

## How to Run Locally

1. Clone the repo:  
   `git clone https://github.com/arunsamy4444/Spotter_Assessment.git`  
2. Navigate to the client folder:  
   `cd Spotter_Assessment/client`  
3. Install dependencies:  
   `npm install`  
4. Start the development server:  
   `npm start`  

---

## Future Improvements

- Implement toast notifications for errors  
- Add loading spinners during API calls  
- Optimize flight search with pagination or filters  
- Upgrade to paid API plan for full live data support  

---

## Contact

Arun Samy V  
[arunsamydeveloper@gmail.com](mailto:arunsamydeveloper@gmail.com)
