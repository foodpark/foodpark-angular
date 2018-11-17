export interface CountryModule {
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
