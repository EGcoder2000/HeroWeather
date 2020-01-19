import { ICityAutocomplete } from './../../weatherPage/models/cityAutocomplete';
import { ICurrentWeather } from './../../../models/currentWeather';

export interface IFavoritesCurrentWeather{
    city: ICityAutocomplete,
    currentWeather: ICurrentWeather
}
