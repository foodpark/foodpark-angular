import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MoltinAccessCode } from '../model';

@Injectable({providedIn: 'root'})
export class FileUploadService {
    constructor(private http: HttpClient) {}

    private moltin_file_url = 'https://api.moltin.com/v2/files';
    private moltin_access_url = 'https://api.moltin.com/oauth/access_token';
    private client_id = 'eDlPjoMabiu84tszlmr9gcpgm1YJXOJoSZxCBooYuW';
    private grant_type = 'client_credentials';
    private client_secret = 'hqvxfSwzIz9RP3nTLP3SbDZUUDDpfMteRJtfm3rOv3';

    fetchMoltinToken() {
        const data = new FormData();
        data.append('client_id', this.client_id);
        data.append('grant_type', this.grant_type);
        data.append('client_secret', this.client_secret);

        return this.http.post<MoltinAccessCode>(this.moltin_access_url, data);
    }

    uploadFile(fileData: any) {
        this.fetchMoltinToken().subscribe( (authToken) => {
            const httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': authToken['token_type'] + ' ' + authToken['access_token']
                })
              };

            return this.http.post(this.moltin_file_url, fileData, httpOptions);
        });
    }
}
