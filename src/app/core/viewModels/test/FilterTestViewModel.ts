export abstract class FilterTestViewModel{
    public geometryId: number=0;
    public testMethodId: number=0;
    public testTypeId: number=0;
    public statusId:number|string='';
    public testDateStart: Date|string= new Date();
    public testDateEnd: Date|string= new Date();

    public workOrder: string='';
    public customerName: string=''
}