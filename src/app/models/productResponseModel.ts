import { Product } from "./product";
import { ResponseModel } from "./responseModel";

export interface TodosResponseModel extends ResponseModel{
    data:Product[]


}