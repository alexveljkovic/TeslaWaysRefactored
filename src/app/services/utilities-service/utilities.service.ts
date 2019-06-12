import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor() {}
    toArray(obj) {
        if (Array.isArray(obj)) {
            return obj;
        } else {
            return [obj];
        }
    }

    sortPoints(lat, lon, radius, points) {
        return points;
    }
}
