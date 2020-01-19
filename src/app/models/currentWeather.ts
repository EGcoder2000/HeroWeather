export interface ICurrentWeather{
    LocalObservationDateTime: string,
    EpochTime: number,
    WeatherText: string,
    WeatherIcon: number,
    HasPrecipitation: boolean,
    PrecipitationType: any,
    IsDayTime: boolean,
    Temperature: ITemperature,
    MobileLink: string,
    Link: string
}

interface ITemperature{
    Metric: any,
    Imperial: any
}
