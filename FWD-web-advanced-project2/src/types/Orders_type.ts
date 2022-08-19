type Orders={
    id?:number;
    productId:number;//[foreign key to product table]
    userId:number;//[foreign key to user table]
    productQuantity:number;
    status_of_order: string; //active ? complete;
}
export default Orders;