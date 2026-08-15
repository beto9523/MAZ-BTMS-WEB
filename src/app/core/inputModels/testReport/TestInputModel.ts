

export class TestInputModel{
    action :number | null;
    testId: number | null;
    workOrderId: number | null;
    workOrderNumber?: string|null;
    locationId: number | null;
    testMachineId: number | null;
    testTypeId: number | null;
    operatorId: number | null;
    kindTestId: number | null;
    testMethodId: number | null;
    geometryId: number | null;
    hold: Date | null;
    uomId: number | null;
    targetTest: number | null;
    temperature: string;
    humidity: string ;
    testStatusId: number | null;
    notes: string;
    notesOff: string;
    guardFlag: number | null;
    loadRateTarget: number | null;
    lengthTest: number | null;
    enabledTest: number | null;
    user: string;
    signature: string;
    
    constructor(data?: TestInputModel) {
        this.action = data ? data.action: null;
        this.testId = data ? data.testId: null;
        this.workOrderId = data ? data.workOrderId: null;
        this.locationId = data ? data.locationId: null;
        this.testMachineId = data ? data.testMachineId: null;
        this.testTypeId = data ? data.testTypeId: null;
        this.operatorId = data ? data.operatorId:null;
        this.kindTestId = data ? data.kindTestId : null;
        this.testMethodId = data ? data.testMethodId : null;
        this.geometryId = data ? data.geometryId:null;
        this.hold = data ? data.hold : null;
        this.uomId = data ? data.uomId : null;
        this.targetTest = data ? data.targetTest : 0;
        this.temperature = data ? data.temperature:"";
        this.humidity = data ? data.humidity : "";
        this.testStatusId = data ? data.testStatusId : null;
        this.notes = data ? data.notes : "";
        this.notesOff = data ? data.notesOff : "";
        this.guardFlag = data ? data.guardFlag : null;
        this.lengthTest = data ? data.lengthTest : null;
        this.loadRateTarget = data ? data.loadRateTarget : null;
        this.enabledTest = data ? data.enabledTest : null;
        this.user = data ? data.user : "";
        this.signature = data ? data.signature : "";

      }
}