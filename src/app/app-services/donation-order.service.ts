import {Injectable} from '@angular/core';
import {DonationOrderModel, MasterLoadModel} from '../model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DonationOrderService {

    private donationOrders: DonationOrderModel[];
    private donationOrderUpdated = new Subject<DonationOrderModel[]>();

    constructor(private http: HttpClient) {
    }

    getDonationOrderListener() {
        return this.donationOrderUpdated.asObservable();
    }

    getAllDonationOrders() {
        this.http.get<DonationOrderModel[]>(environment.apiUrl + ' /api/v1/rel/donation_orders')
            .subscribe((response) => {
                this.donationOrders = response;
                this.donationOrderUpdated.next([...this.donationOrders]);
            });
    }

    addDonationOrder(obj: any) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/donation_orders', obj);
    }

    updateDonationOrder(donationOrderId: number, obj: any) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/donation_orders' + donationOrderId, obj);
    }

    deleteDonationOrder(deletedonationOrderId) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/master_loads' + deletedonationOrderId);
    }
}
