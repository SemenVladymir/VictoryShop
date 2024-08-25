class Product {
  constructor(Id, Name, Description, Price, Photos = [], CathegoryId, DiscountId,
    IsAvailable, CountryId, BrandId, GenderId, SubcathegoryId, SportId, ColorId, ListOfSize = []) {
    this.id = Id;
    this.name = Name;
    this.description = Description;
    this.price = Price;
    this.photos = Photos;
    this.cathegoryId = CathegoryId;
    this.discountId = DiscountId;
    this.isAvailable = IsAvailable;
    this.countryId = CountryId;
    this.brandId = BrandId;
    this.genderId = GenderId;
    this.subcathegoryId = SubcathegoryId;
    this.quantity = 1;
    this.sportId = SportId;
    this.colorId = ColorId;
    this.sizes = ListOfSize;
  }

  formatPrice() {
    const formattedPrice = new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(this.price);

    // Заменить символ гривны (₴) на "грн."
    return formattedPrice.replace('₴', 'грн.');
  }

  applyDiscount(discountPercentage) {
    this.price = this.price * (1 - discountPercentage / 100);
  }

}

class Color {
  constructor(Id, Name) {
    this.id = Id;
    this.name = Name;
  }
}

class Country {
  constructor(Id, Name) {
    this.id = Id;
    this.name = Name;
  }
}

class Brand {
  constructor(Id, Name) {
    this.id = Id;
    this.name = Name;
  }
}

class Gender {
  constructor(Id, Name) {
    this.id = Id;
    this.name = Name;
  }
}

class Cathegory {
  constructor(Id, Name) {
    this.id = Id;
    this.name = Name;
  }
}

class Subcathegory {
  constructor(Id, Name, CathegoryId) {
    this.id = Id;
    this.name = Name;
    this.cathegoryid = CathegoryId;
  }
}

class Size {
  constructor(Id, InternationalName, LocalName) {
    this.id = Id;
    this.iname = InternationalName;
    this.lname = LocalName;
  }
}

class Sport {
  constructor(Id, Name) {
    this.id = Id;
    this.name = Name;
  }
}

class Photo {
  constructor(Id, URL, ProductId, Details) {
    this.id = Id;
    this.url = URL;
    this.productId = ProductId;
    this.details = Details;
  }
}

class Discount {
  constructor(Id, Name, StartDate, EndDate, Percent) {
    this.id = Id;
    this.name = Name;
    this.percent = Percent;
    this.startdate = StartDate;
    this.enddate = EndDate;
  }
}

export { Product, Color, Country, Cathegory, Subcathegory, Brand, Gender, Size, Sport, Photo, Discount };

