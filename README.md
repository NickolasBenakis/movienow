# movienow

[![Build Status](https://travis-ci.com/NickolasBenakis/movienow.svg?token=qxst7gxQLWN7UYpYnuGV&branch=master)](https://travis-ci.com/NickolasBenakis/movienow)

## Table of Contents
* [Intro](#intro)
* [Install](#install)
* [Build](#build)
* [Run](#run)
* [Test](#test)
* [CI](#continuousIntegration)
* [Optimizations](#Optimizations)



## Intro
Movienow is a single page application that consumes the [MovieDB API](https://developers.themoviedb.org/3) to allow you to browse movies, watch trailers, read reviews, and more. It is developed entirely in vanilla JS. The only dependencies are a few Babel and Webpack packages required for transpiling / compiling.It is also ProgressiveWepApp, so you can explore movies from your phone as well offline! 

More specifically, the app allows you to:

* Browse movies currently in theaters
* Search for movies
* View more movie details (trailer, reviews, and similar movies)


## Install
To install, `cd` to project root and run:
```
$ npm install
```
This will install the required Babel and Webpack dependencies. From there, you can build or run the app.

## Build
To build for production, `cd` to project root and run:
```
$ npm run build
```
This will run `webpack` with the `--mode` option set to `production`, which optimizes the build for a production environment. You can read more about this option [here](https://webpack.js.org/configuration/mode/).

To build for development, `cd` to project root and run:
```
$ npm start
```
This will run `webpack` with the `--mode` option set to `development`.

*Note: There are two different files for webpack modes, `webpack.dev.js`, `webpack.prod.js`*

## Run
To run the app in development, `cd` to project root and run:
```
$ npm start
```
This will run `webpack-dev-server` with hot reloading, allowing you to run the app in your browser, continue to develop, and see your changes take effect live.

## Test
This application does rely on jest testing framework. Run this following command to test the whole coverage of the app:
```
$ npm test
```
This uses `jest` to test the whole coverage of the application.

## CI

This application is getting build in every commit/ PR with Travis.To ensure that the production build does not break.

### Optimizations
A few optimizations have been implemented to help improve the performance of the app, including:

* Using Lit html as template Engine for dom rendering, save dom performance, check [here](https://lit-html.polymer-project.org/)
* Used CDN cloudinary for prefeching images in order to optimize image resolution, responsiveness depending on the viewport and the device [here](https://cloudinary.com/)
* Lazy loading of main poster images
* Used Botli google's algorithm among with other minification plugins included in the webpack --prod setup
* Caching of now playing results
* Caching of search results
* Local folder used for the external libraries, in order to save round trips
* Including svgs within the app rather than relying on external loading (eg FontAwesome)
* Including fonts with the app rather than relying on external loading (eg Google Fonts)
