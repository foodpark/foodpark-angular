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


