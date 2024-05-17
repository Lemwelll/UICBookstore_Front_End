export default function useCart() {
  const items = useState("cartItems", (): TInventoryItem[] => []);

  /*
  function addToCart(item: TInventoryItem) {
    const similarItem = items.value.find((i) => i.id === item.id);
    if (!similarItem || (similarItem && similarItem.size !== item.size)) {
      const product = JSON.parse(JSON.stringify(item));
      product.stock = 1;
      console.log(product);
      items.value.push(product);
    }
  }*/

  function addToCart(item: TInventoryItem) {
    const similarItem = items.value.find((i) => i.id === item.id);
    if (!similarItem || (similarItem && similarItem.size !== item.size)) {
        const product = JSON.parse(JSON.stringify(item));
        product.stock = 1;
        product.totalPrice = product.price; // Initialize totalPrice with the price of one item
        console.log(product);
        items.value.push(product);
    } else {
        similarItem.stock++; // Increase the quantity of the existing item
        similarItem.totalPrice = similarItem.price * similarItem.stock; // Update the total price
    }
  }


  const { inventoryItems } = useInventory();

  
  /*
  function increaseItemStock(item: TInventoryItem) {
    const inventoryItem = inventoryItems.value.find((i) => i.id === item.id);
    const similarItem = items.value.find((i) => i.id === item.id);
    if (
      similarItem &&
      inventoryItem &&
      inventoryItem.stock > similarItem.stock
    ) {
      similarItem.stock++;
    }
  }
  */

  function increaseItemStock(item: TInventoryItem) {
    const selectedItem = items.value.find((i) => i.name === item.name);
    if (selectedItem) {
      selectedItem.stock += 1;
      selectedItem.totalPrice = selectedItem.stock * selectedItem.price; // Update total price
      console.log('ITEM SELECTED', selectedItem);
    }
  }
  
  

  /*
  function reduceItemStock(item: TInventoryItem) {
    const similarItem = items.value.find((i) => i.id === item.id);
    if (similarItem) {
      similarItem.stock--;
    }

    if (similarItem?.stock === 1) {
      const index = items.value.findIndex((i) => i.id === item.id);
      items.value.splice(index, 1);
    }
  }
  */

  function reduceItemStock(item: TInventoryItem) {
    const selectedItem = items.value.find((i) => i.id === item.id);
    if (selectedItem) {
        selectedItem.stock -= 1;
        selectedItem.totalPrice = selectedItem.stock * selectedItem.price; // Update total price
        console.log('ITEM SELECTED', selectedItem);
    }
  }

  const total = computed(() => {
    return items.value.reduce((acc, item) => {
      return acc + item.price * item.stock;
    }, 0);
  });

  return {
    items,
    addToCart,
    increaseItemStock,
    reduceItemStock,
    total,
  };
}
