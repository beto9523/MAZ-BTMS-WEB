export interface JanusResponse<T>{
  code: number;
  responseMessage: string;
  statusCode: number;
  success: boolean;
  requestDate: string;
  responseDate: string;
  dataResponse: T;
}
export interface JanusResponseNoData{
  code: number;
  responseMessage: string;
  statusCode: number;
  success: boolean;
  requestDate: string;
  responseDate: string;
}
