/*
Validate if the string is ('', null, undefined)
*/
export function validateStringEmpty(str: string){
  return !(str == null || str == '' || str?.length <= 0)
}
