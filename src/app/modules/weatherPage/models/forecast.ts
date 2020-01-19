export interface IForecast{
    Headline: IHeadline,
    DailyForecasts: IDailyForecasts[]
}

interface IHeadline{
    EffectiveDate: string,
    EffectiveEpochDate: number,
    Severity: number,
    Text: string,
    Category: string,
    EndDate: string,
    EndEpochDate: number,
    MobileLink: string,
    Link: string,
}

interface IDailyForecasts{
    Date: string,
    EpochDate: number,
    Temperature: object,
    Day: object,
    Night: object,
    Sources: string[],
    MobileLink: string,
    Link: string,
}