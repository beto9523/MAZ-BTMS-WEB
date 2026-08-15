

export class calibrationCertInputModel{
    calibration_certificate_id :number | null | undefined;
    workNumber: string | null | undefined;
    uploadBy: number | null | undefined;
    upload_Date?: Date | null|undefined;
    certificateDate: Date | null | undefined;
    validFrom:Date | null | undefined;
    validTo:Date | null | undefined;
    Myfile:Uint8Array |null| undefined;
    fileBase64:string|null|undefined;
    file:File   |undefined;
    formData: FormData|undefined;
    locationId:number | null | undefined;
    testMachineId:number | null | undefined;
    locationUsed:string | null | undefined;
    notes:string | null | undefined;
    
    pathcert?:string|null;
    authorizedBy?:number|null;
    id?:string|null;
    woId?:string|null;
    uploadByUserName?:string|null;
}