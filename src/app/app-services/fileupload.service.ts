import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MoltinAccessCode} from '../model';
import {Subject} from 'rxjs';
import {DataService} from './data.service';

@Injectable({providedIn: 'root'})
export class FileUploadService {
    constructor(private http: HttpClient, private dataService: DataService) {
    }

    private fileURL: string;
    private fileUploaded = new Subject<string>();

    private moltin_file_url = 'https://api.moltin.com/v2/files';
    private moltin_access_url = 'https://api.moltin.com/oauth/access_token';
    private client_id = 'eDlPjoMabiu84tszlmr9gcpgm1YJXOJoSZxCBooYuW';
    private grant_type = 'client_credentials';
    private client_secret = 'hqvxfSwzIz9RP3nTLP3SbDZUUDDpfMteRJtfm3rOv3';

    getFileUploadListener() {
        return this.fileUploaded.asObservable();
    }

    private fetchMoltinToken() {
        const data = new FormData();
        data.append('client_id', this.client_id);
        data.append('grant_type', this.grant_type);
        data.append('client_secret', this.client_secret);

        return this.http.post<MoltinAccessCode>(this.moltin_access_url, data);
    }

    uploadFile(file: File) {
        const fileData = new FormData();
        fileData.append('file', file, file.name);

        this.fetchMoltinToken().subscribe((authToken) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': authToken['token_type'] + ' ' + authToken['access_token']
                })
            };

            this.http.post(this.moltin_file_url, fileData, httpOptions)
                .subscribe((response) => {
                    this.fileUploaded.next(response['data']['link']['href']);
                });
        });
    }

    /* //Unused methods, but needs to be improved
    uploadFileAndGetActualResponse(file: File) {
        const fileData = new FormData();
        fileData.append('file', file, file.name);

        this.fetchMoltinToken().subscribe((authToken) => {
            console.log(authToken);
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': authToken['token_type'] + ' ' + authToken['access_token']
                })
            };
            return this.http.post(this.moltin_file_url, fileData, httpOptions);
        });
    }

    parseResponseAndGetURL(response: any) {
        const data = response['data'];
        const link = data['link'];

        return link['href'];
    }
    */
}
