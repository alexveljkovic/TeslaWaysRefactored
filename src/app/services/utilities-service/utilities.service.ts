import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor() {
    }

    toArray(obj) {
        if (Array.isArray(obj)) {
            return obj;
        } else {
            return [obj];
        }
    }

    choice(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    euclideanDistance(rawLat1, rawLon1, rawLat2, rawLon2) {  // generally used geo measurement function
        console.log(rawLat1, rawLon1, rawLat2, rawLon2);
        const lat1 = this.toFloat(rawLat1);
        const lon1 = this.toFloat(rawLon1);
        const lat2 = this.toFloat(rawLat2);
        const lon2 = this.toFloat(rawLon2);
        const R = 6378.137; // Radius of earth in KM
        const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        console.log(d * 1000);
        return d * 1000; // meters
    }

    toInt(obj) {
        return parseInt(obj, 10);
    }
    toFloat(obj) {
        return parseFloat(obj);
    }
}
