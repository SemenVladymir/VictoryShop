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

class Delivery {
    constructor(Id, UserId, StatusId, OrderId, Address, Additionally, Date) {
        this.id = Id;
        this.orderId = OrderId;
        this.userId = UserId;
        this.statusId = StatusId;
        this.address = Address;
        this.additionally = Additionally;
        this.date = Date;
    }
}

class Payment {
    constructor(Id, OrderId, Summ, StatusId, Amount) {
        this.id = Id;
        this.orderId = OrderId;
        this.summ = Summ;
        this.statusId = StatusId;
        this.amount = Amount;
    }
}
  
export { Order, Status, Delivery, Payment };