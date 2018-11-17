import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../../../app-services/http.service';


@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {
    gridMetadata;
    territories = [];
    country = [];

    constructor(private httpService: HttpService, private router: Router) {
        this.httpService.loadTerritoryData().subscribe(
            res => {
                Object.values(res).forEach(item => {
                    this.territories.push(item['territory']);
                    this.country.push(item['country']);
                });
                this.gridMetadata = res;
            }
        );
    }

    ngOnInit() {
    }

    onEditClick() {
        this.router.navigate(['/admin/territories/edit_territory']);
    }

    onDeleteClick() {
    }

}
