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
    addendeum_file: string;
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
