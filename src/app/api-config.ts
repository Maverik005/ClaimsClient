export class ApiConfig {
    Api_Base_Uri: string;
    getStates: string;
    getCountries:string;
    getManufacturers:string;
    getVehicleModels:string;
    addClaim:string;
    getAllClaims:string;
    deleteClaim:string;
    updateClaim:string;
}

const apiConfig: ApiConfig = {
    Api_Base_Uri: "https://claimmanager.azurewebsites.net",
    getStates: "/GetStates",
    getCountries:"/GetCountries",
    getManufacturers:"/GetManufacturers",
    getVehicleModels:"/GetVehicleModels",
    addClaim:"/api/Claims",
    getAllClaims:"/api/Claims",
    deleteClaim:"/deleteClaim",
    updateClaim:"/updateClaim"
}

export { apiConfig }