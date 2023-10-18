import { Item, Query } from "../../../../interface/metrc.interface";

function queryMetrcItems(filteredItems: Item[], query: Query): Item[] {
  filteredItems = filteredItems.filter((item: Item) => {
    let type: boolean = true;
    let strain_name: boolean = true;
    let catagory_name: boolean = true;

    if (query.quantity_type) {
      type = item.QuantityType === query.quantity_type;
    }
    if (query.strain_name) {
      strain_name = item.StrainName === query.strain_name;
    }
    if (query.product_category_name) {
      catagory_name = item.ProductCategoryName === query.product_category_name;
    }
    return type && strain_name && catagory_name;
  });
  return filteredItems;
}

function searchMetrcItems(filteredItems: Item[], searchName: string) {
  filteredItems = filteredItems.filter((item: Item) => {
    return item.Name.toLowerCase().includes(searchName.toLowerCase());
  });
  return filteredItems;
}

export { searchMetrcItems, queryMetrcItems };
