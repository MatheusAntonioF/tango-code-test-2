function generateInvoice(invoices) {
  /**
   * coke -> 5 usd
   * fries -> 20 usd
   * ice-cream -> 10 usd
   *
   * if in the same day the client buy a coke and fries -> 21 usd
   */

  /**
   * key -> customerID
   * value -> {
   *  2021-01-02: [] Array<products>
   * }
   */

  const productValues = {
    COKE: 5,
    FRIES: 20,
    'ICE-CREAM': 10,
  };

  const parsedInvoices = {};

  // loop invoices
  for (let index = 0; index < invoices.length; index++) {
    const currentInvoice = String(invoices[index]);

    /**
     * get client ID
     * product name
     * date
     */

    const [date, productName, customerID] = currentInvoice.split(' ');

    if (parsedInvoices[customerID]) {
      // create date object

      // user exists but date not

      if (parsedInvoices[customerID][date]) {
        const currentUserDate = [
          ...parsedInvoices[customerID][date],
          productName,
        ];

        parsedInvoices[customerID] = {
          ...parsedInvoices[customerID],
          [date]: currentUserDate,
        };
      } else {
        parsedInvoices[customerID] = {
          ...parsedInvoices[customerID],
          [date]: [productName],
        };
      }
    } else {
      parsedInvoices[customerID] = {
        [date]: [productName],
      };
    }
  }

  // resolve this if in the same day the client buy a coke and fries -> 21 usd

  const DISCOUNT_VALUE = 4;

  const result = {};

  Object.entries(parsedInvoices).map(([customerID, productsDate]) => {
    let totalValueByCustomer = 0;

    Object.entries(productsDate).map(([date, products]) => {
      // list of products
      let productValuePerDay = products.reduce(
        (accumulator, currentProduct) => {
          const productValue = productValues[currentProduct];

          accumulator += productValue;

          return accumulator;
        },
        0
      );

      // check in the products the amount of coke and fries and by this length apply the number of discount

      // filter by coke - 1 - 2 - 3
      // filter by fries - 1 - 2

      const filterByCoke = products.filter(
        productName => 'COKE' === productName
      );

      const filterByFries = products.filter(
        productName => 'FRIES' === productName
      );

      // check by the min value

      const amountDiscount = Math.min(
        filterByCoke.length,
        filterByFries.length
      );

      if (amountDiscount > 0) {
        productValuePerDay =
          productValuePerDay - DISCOUNT_VALUE * amountDiscount;
      }

      totalValueByCustomer += productValuePerDay;
    });

    result[customerID] = totalValueByCustomer;
  });

  return result;
}

const params = [
  '2021-01-02 COKE 998',
  '2021-01-02 COKE 998',
  '2021-01-02 FRIES 998',
  '2021-01-02 FRIES 998',
  '2021-01-02 FRIES 998',
  '2021-01-03 COKE 998',
  '2021-01-03 FRIES 998',
  '2021-01-03 ICE-CREAM 998',
  '2021-01-10 COKE 101',
  '2021-01-10 FRIES 101',
  '2021-01-11 ICE-CREAM 901',
  '2021-01-12 COKE 998',
];

console.log(generateInvoice(params));
