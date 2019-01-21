import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class DataService {
    imageSource: string;
    sponsor1Image: string;
    sponsor2Image: string;
    loadObj = {
        mainHub: '',
        regionalHub: '',
        loadName: ''
    };

    // localeStringsMap: any;

    constructor(private http: HttpClient) {
    }

    getJsonData(jsonfile: string): Observable<any> {
        return this.http.get('assets/json/' + jsonfile).pipe(map(res => {
            return res || {};
        }));
    }

    stringComparator(originalString: string, comparedString: string) {
        return this.nullCheck(originalString) && this.nullCheck(comparedString) && originalString.toLowerCase() === comparedString.toLowerCase();
    }

    nullCheck(element): boolean {
        return element !== null && element !== undefined && element !== '';
    }
}
