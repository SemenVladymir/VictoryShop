class Order {
    constructor(Id, ProductId, UserId, StatusId, Amount) {
        this.id = Id;
        this.productId = ProductId;
        this.userId = UserId;
        this.statusId = StatusId;
        this.amount = Amount;
    }
}
  

class Status {
    constructor(Id, Name) {
      this.id = Id;
      this.name = Name;
    }
}
  
export { Order, Status };