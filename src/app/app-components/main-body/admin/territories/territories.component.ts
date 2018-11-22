import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TerritoryService} from '../../../../app-services/territory.service';
import {Subscription} from 'rxjs';
import {AppConstants} from '../../../../app-constants/common-constants';
import {TerritoryModel} from '../../../../model';


@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit, OnDestroy {
    territories: TerritoryModel[] = [];
    private territoriesSubscription: Subscription;

    constructor(private territoryService: TerritoryService, private router: Router) {
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
        localStorage.setItem('editterritory', JSON.stringify(this.territories[index]));
        this.router.navigate(['/admin/editterritory']);
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

