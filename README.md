# Weather App

> Microverse ES6 Project

<p align="right">
  <br>
  <a href="https://github.com/ricardovaltierra/weatherapp">Explore the repo »</a>
  <br>
  <a href="https://github.com/ricardovaltierra/weatherapp/issues">Request Feature</a>
</p>

## Table of Contents

* [About the Project](#about-the-project)

* [Preview](#preview)

* [Built With](#built-with)

* [Getting Started](#getting-started)

* [How it Works](#how-it-works)

* [Contributing](#contributing)

* [Contact](#contact)

* [MIT License](#mit-license)

* [Creative Commons License](#creative-commons-license)


## About The Project

Microverse WeatherApp Project for applying Asynchronous JS &amp; API

Mobile-first small aplication to make queries about weather selected by any place inserted into the search box. 

## Preview
### Insert a place to look for weather
<img src="./src/img/usage_1.gif" alt="Query places to look for its weather information"/>

> [Live Version!](https://rawcdn.githack.com/ricardovaltierra/weatherapp/20d7c10d053857e3f0a6f40ef613e815fe425a32/dist/index.html)

Feel free to use and recommend it.

### Built With

* [HTML5](https://developer.mozilla.org/es/docs/HTML/HTML5)

* [Bulma/CSS](https://bulma.io/)

* [ES6](https://es6.io/)

* [Webpack 4](https://webpack.js.org/)

* npm Packages used:
    * [ESLint](https://eslint.org/)
    * [StyleLint](https://stylelint.io/)
    * [Webpack asset managers](https://webpack.js.org/guides/asset-management/)
    * [Algolia Places](https://community.algolia.com/places/)

* [AerisWeather API](https://www.aerisweather.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

Clone or fork the <a href="https://github.com/ricardovaltierra/weatherapp">repo</a> [git@github.com:ricardovaltierra/weatherapp.git]

*note you need have install npm or yarn
* [npm](https://www.npmjs.com/get-npm)
* [yarn](https://classic.yarnpkg.com/en/docs/install)

## How it Works

This webpage is built with pure Javascript, it needs Webpack to proper use because has various imports of code and it has various little helper functions. All of the resources (images, fonts) and .js files are located inside `/src` folder.

### Running the code

It is just required to build on top to have an account and credentials for the following API's:

* [Algolia Places](https://community.algolia.com/)
* [Aeris Weather](https://www.aerisweather.com/)

Both are free for usage. Once done just fill the credentials on `src/credentials.json`.


*   Navigate to the root directory of the project

*   Run this command on your terminal to add all the required packages and dependencies
    ```
    $ npm install
    ```
*   Now you can run with webpack and play with it
    ```
    $ npm run watch
    ```
    
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## Contact

Ricardo Valtierra - [@RicardoValtie15](https://twitter.com/RicardoValtie15) - ricardo_valtierra@outlook.com  - [linkedin.com/in/ricardovaltierra/](https://www.linkedin.com/in/ricardovaltierra/)

## MIT License

This project is under the [MIT](LICENSE) license.

## Creative Commons

Shield: [![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

"plain weather icons" by [MerlinTheRed](https://www.deviantart.com/merlinthered/about#about) is licensed under CC BY 3.0

[![CC BY-SA 3.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: https://creativecommons.org/licenses/by-sa/3.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/3.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%203.0-lightgrey.svg

