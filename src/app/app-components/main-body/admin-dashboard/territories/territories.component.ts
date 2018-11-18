import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TerritoryService} from '../../../../app-services/territory.service';
import {ErrorService} from '../../../../error/error.service';


@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {
    gridMetadata;
    territories = [];

    constructor(private service: TerritoryService,
                private router: Router,
                private errorService: ErrorService) {
        this.service.getTerritories().subscribe(
            res => {
                Object.values(res).forEach(item => {
                    this.territories.push({'name': item['territory'], 'country': item['country'], 'id': item['id']});
                });
                this.gridMetadata = res;
            }
        );
    }

    ngOnInit() {
    }

    onEditClick() {
        this.router.navigate(['/admin/edit_territory']);
    }

    onDeleteClick() {
        this.errorService.throwError('Are you sure ?');
        this.service.deleteTerritories('');
    }

}
