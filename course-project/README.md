# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

I created a small weather/forecast webapp that can be used to fetch current weather and 3-day forecast for users location.
App has possibility to geolocate the user (if granted access) to fetch weather data automatically.
App also has a precipitation map functionality for Finland that is automatically fetched.
As a "bonus" I created a quick localization for the user interface but couldn't figure out how to do it for JSON data.

To run this, you need to provide an APIkey to openweathermap.org, as the key is in a file that is gitignored. No other specific instructions should be needed, I hope.
App itself only has a couple of elements the user can interact with and I tried to keep them as selfexplanatory as possible.

I neither had time (thanks DSA) nor I didn't want to focus too much on making things pretty as I felt it's more important to get the functionalities work correctly.
Struggled a lot with JS and still feel like I'm 100% out of touch with it as I have to read all the libraries documentation and code many times before I understand what is going on.