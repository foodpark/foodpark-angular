import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { TerritoryModel } from 'src/app/model';
import { TerritoryService } from 'src/app/app-services/territory.service';


@Component({
    selector: 'app-territories',
    templateUrl: './territories-listing.component.html',
})
export class TerritoriesListingComponent implements OnInit, OnDestroy {
    territories: TerritoryModel[] = [];
    private territoriesSubscription: Subscription;

    constructor(private territoryService: TerritoryService,
                private router: Router) {
    }

    ngOnInit() {
        this.territoryService.getTerritories();
        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                this.territories = territories;
            });
    }

    onAddTerritoryClick() {
        this.router.navigate(['/admin/addterritory']);
    }

    onEditClick(index: number) {
        this.router.navigate(['/admin/editterritory', {territoriesId: JSON.stringify(this.territories[index]['id'])}]);
    }

    onDeleteClick(id: number) {
        this.territoryService.deleteTerritory(id).subscribe(() => {
            this.territoryService.getTerritories();
        });
    }

    ngOnDestroy() {
        this.territoriesSubscription.unsubscribe();
    }
}

