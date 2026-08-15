import { CatalogViewModel } from "@ViewModels/shared/CatalogViewModel";

export interface calibrationCertViewModel{
    id:string,
    woId: string,
    woNumber: string,

    validFrom: Date,
    validTo: Date,
    uploadDate: Date,
    uploadBy:string,
    testMachineDesc:string,
    serialNumber:string,
    pathcert:string,
    notes:string,
    locationUsedCalibrate:string,
    locationMachine:string,
    certificateDate:Date,
    authorizedBy:string,
    //
    uploadById:number,
    locationId:number,
    testMachineId:number
    authorizedById:number

}
