import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HubmanagerService} from '../../../../app-services/hubmanager.service';
import {CountryModel, TerritoryModel} from '../../../../model';

@Component({
    selector: 'app-mainhub-manager-listing',
    templateUrl: './mainhub-manager-listing.component.html'
})

export class MainhubManagerListingComponent implements OnInit, OnDestroy {
    territories: TerritoryModel[] = [];
    countries: CountryModel[] = [];

    constructor(private router: Router, private hubmanagerService: HubmanagerService) {
    }

    ngOnInit() {
    }

    onAddMainHubManagerClick() {
        this.router.navigate(['/admin/editmainhubmanager']);
    }

    onEditClick(index: number) {
        localStorage.setItem('editterritory', JSON.stringify(this.territories[index]));
        this.router.navigate(['/admin/editmainhubmanager']);
    }

    onDeleteClick(id: number) {
        this.hubmanagerService.deleteTerritory(id).subscribe(() => {
            this.hubmanagerService.getTerritories();
        });
    }

    ngOnDestroy() {
    }
}

