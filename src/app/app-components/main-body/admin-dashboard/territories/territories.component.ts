import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TerritoryService} from '../../../../app-services/territory.service';
import {ErrorComponent} from '../../../../error/error.component';
import {MatDialog} from '@angular/material';


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
                private dialog: MatDialog) {
        this.getTerritories();
    }

    getTerritories() {
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

    onDeleteClick(id: number) {
        // this.dialog.open(ErrorComponent, {data: {message: 'are you sure?'}});
        this.service.deleteTerritories(id).subscribe();
        this.getTerritories();
    }

}
