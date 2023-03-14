// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//first key: nGB5jFGb8kDmhOQ62OO7SsAqGIYzsj1G
//second key: RQXIaP9XInvoDEXyQ8R7ILP1vJjhDY06
//third key: A0sbWoodXq3mLePacc3GjAifcxNpMXvO

export const environment = {
  production: false,
  autocompleteBaseUrl:
    "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?",
  currentWeatherBaseUrl:
    "https://dataservice.accuweather.com/currentconditions/v1/",
  forecastBaseUrl:
    "https://dataservice.accuweather.com/forecasts/v1/daily/5day/",
  apikey: "nGB5jFGb8kDmhOQ62OO7SsAqGIYzsj1G",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
