export interface ICityAutocomplete{
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: ICountry,
    AdministrativeArea: IAdministrativeArea
}

interface ICountry{
    ID: string,
    LocalizedName: string
}
interface IAdministrativeArea{
    ID: string,
    LocalizedName: string
}
