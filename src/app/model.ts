export interface AuthData {
    username: string;
    password: string;
}

export interface CountryModel {
    id: number;
    name: string;
    is_enabled: boolean;
    currency_id: number;
    currency: string;
    moltin_client_id: string;
    moltin_client_secret: string;
    default_payment: string;
    currency_symbol: string;
    country_code: string;
}

export interface PodmanagerModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    country_id: number;
}

export interface HubmanagerModel {
    id: number;
    role: string;
    food_park_id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    country_id: number;
    territory_id: number;
}

export interface MainhubModel {
    id: number;
    name: string;
    territory_id: number;
    country: string;
    latitude: number;
    longitude: number;
    type: string;
}

export interface TerritoryModel {
    id: number;
    territory: string;
    country: string;
    latitude: number;
    longitude: number;
}

export interface RegionalHubModel {
    id?: number;
    name: string;
}

export interface PodModel {
    id: number;
    name: string;
    wordfile: string;
    title: string;
    connected_with: string;
    sponsor: string;
    latitude: number;
    longitude: number;
    approved: boolean;
    type: string;
}

export interface HubPickupModel {
    id: number;
}

export interface PodPickupModel {
    id: number;
}

export interface MoltinAccessCode {
    expires: number;
    identifier: string;
    expires_in: number;
    access_token: string;
    token_type: string;
}

export interface MasterLoadModel {
    load_name: string;
    excelfile: string;
}

export interface DonationOrderModel {
    master_load_id: number;
    regional_hub_id: number;
    load_id: number;
    load_name: string;
}

export interface CategoryModel {
    id: number;
    category: string;
    category_photo: string;
}

export interface LoadItemModel {
    id: number;
    category_id: number;
    category_name: string;
    quantity: number;
    description: string;
    load_type: string;
    load_id: number;
}

export interface ReportingModel {
    mainhub: MainHubReportingModel;
    master_loads: number;
    regionalhubs: RegionalHubReportingModel[];
}

export interface MainHubReportingModel {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface RegionalHubReportingModel {
    id: number;
    name: string;
    load_count: number;
    pods: PodReportingModel[];
}

export interface PodReportingModel {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    load_count: number;
}


export interface VolunteerModel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    is_deleted: boolean;
    available: boolean;
}
