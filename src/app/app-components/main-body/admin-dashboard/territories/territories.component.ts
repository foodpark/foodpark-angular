import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TerritoryService} from '../../../../app-services/territory.service';
import { TerritoryModel } from 'src/app/app-modules/territory.model';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {
    gridMetadata;
    territories: TerritoryModel[] = [];
    private territoriesSubscription: Subscription;

    constructor(private territoryService: TerritoryService, private router: Router) {
        this.territoryService.getTerritories();
        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                this.territories = territories;
        });
    }

    ngOnInit() {
    }

    onEditClick() {
        this.router.navigate(['/admin/edit_territory']);
    }

    onDeleteClick() {
        // this.service.deleteTerritories('');
    }

}
