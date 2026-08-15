export interface MenuModel{
  name:string;
  isActived: boolean;
  icon:string
  subMenu: SubMenuModel[];
}
export interface SubMenuModel{
  name:string;
  path:string;

}
