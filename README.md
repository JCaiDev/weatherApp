# Jeffrey's WeatherApp

[Check out the live app here](https://jeffreyweatherapp.netlify.app)

A simple React-based weather application that allows users to search for weather information by city. The app fetches real-time weather data from the OpenWeather API and displays the current weather and an option for a 5-day forecast

## Features

- Search for weather by city
- Display current weather conditions (current temperature and weather)
- View a 5-day weather forecast
- Responsive design

## Tech Stack

- **Frontend:** React, JavaScript, CSS
- **API:** OpenWeather API for weather data
- **Tools:** Vite for development

## Getting Started

To run the app locally, follow these steps:

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```
git clone [https://github.com/flufynarwhal/weatherApp](https://github.com/JCaiDev/weatherApp.git)
```

2. Navigate into the project directory:

```
cd WeatherApp
```

3. Install dependencies:

```
npm install
```

4. Running the App:

```
npm run dev
```

This will start a local development server and open the app in your browser at http://localhost:3000

## API Usage

The app uses the OpenWeather API to fetch weather data. Create an account on OpenWeather and obtain an API key

1. Go to [OpenWeather](https://openweathermap.org) and sign up
2. Sign up and get your free API key
3. Replace the YOUR_API_KEY placeholder in the  
   src/utils/api.jsx const apiKey = "YOUR_API_KEY"

with actual API key

## Unit Testing

This project includes unit tests written with Vitest and React Testing Library. The tests ensure the core functionalities of the app work as expected.

### Running Tests

To execute the unit tests:

```bash
npm run test
```

This command uses the Vitest testing framework configured for the project.

### Tests

- Search Functionality: Verifies that entering a city name and clicking the search button fetches and displays weather data correctly
- Weather Data Fetching: Tests that the app correctly fetches and displays the current weather data (weather description, temperature, wind speed)
- Forecast Data Rendering: Ensures that the forecast data (date, temperature, min-max temperature, wind speed, weather description) for the 5-day forecast is rendered correctly

## Future Improvements

- Enhanced User Interface: Add animations and a more visually appealing design
- Temperature Unit Toggle: The ability to switch between Fahrenheit and Celsius
- Light/Dark Theme: A light and dark theme option
- Accessibility: Utilize aria-label attributes to ensure accessibility for all users
