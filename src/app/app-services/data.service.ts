import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class DataService {
    localeStringsMap: any;

    constructor(private http: HttpClient) {
        this.httpGetTranslations().subscribe(transMap => {
            this.localeStringsMap = transMap;
        });
    }

    getJsonData(role: string): Observable<any> {
        return this.http.get('assets/json/' + role + '-leftnav.json').pipe(map(res => {
            return res || {};
        }));
    }

    getHubManagerJsonData(role: string): Observable<any> {
        return this.http.get('assets/json/' + role + '-manager-leftnav.json').pipe(map(res => {
            return res || {};
        }));
    }

    httpGetTranslations(): Observable<any> {
        const currentLang = navigator.language;
        return this.http.get('assets/i18n/' + currentLang + '.json').pipe(
            map((res: any) => {
                return res || {};
            })
        );
    }

    stringComparator(originalString: string, comparedString: string) {
        return this.nullCheck(originalString) && this.nullCheck(comparedString) && originalString.toLowerCase() === comparedString.toLowerCase();
    }

    nullCheck(element): boolean {
        return element !== null && element !== undefined && element !== '';
    }
}
