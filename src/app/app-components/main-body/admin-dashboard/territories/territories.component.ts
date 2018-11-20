import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TerritoryService} from '../../../../app-services/territory.service';
import {TerritoryModel} from 'src/app/app-modules/territory.model';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit, OnDestroy {
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

    onAddTerritoryClick() {
        this.router.navigate(['/admin/edit_territory']);
    }

    onEditClick(index: number) {
        localStorage.setItem('edit_territory', JSON.stringify(this.territories[index]));
        this.router.navigate(['/admin/edit_territory']);
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

