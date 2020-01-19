import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temperatureConvertor'
})
export class TemperatureConvertor implements PipeTransform {
    transform(temp: number, unit: string): string {
        if (temp && !isNaN(temp)) {
            if (unit === 'C') {
                let temperature = (temp - 32) / 1.8;
                return `${temperature.toFixed(0)}°C`;
            } else {
                let temperature = (temp * 1.8) + 32
                return `${temperature.toFixed(0)}°F`;
            }
        }
        return ':(';
    }
}