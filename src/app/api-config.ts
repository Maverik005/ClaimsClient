export class ApiConfig {
    Api_Base_Uri: string;
    getStates: string;
    getCountries:string;
    getManufacturers:string;
    getVehicleModels:string;
}

const apiConfig: ApiConfig = {
    Api_Base_Uri: "https://localhost:7290",
    getStates: "/GetStates",
    getCountries:"/GetCountries",
    getManufacturers:"/GetManufacturers",
    getVehicleModels:"/GetVehicleModels"
}

export { apiConfig }