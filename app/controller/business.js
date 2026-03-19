module.exports = (app) => {
  const sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms * 1000);
    });
  };

  const baseController = require("./base")(app);

  return class BusinessController extends baseController {
    create(ctx) {
      const { product_name: productName, price, inventory } = ctx.request.body;

      this.success(ctx, {
        product_id: Date.now(),
        product_name: productName,
        price,
        inventory,
      });
    }

    async update(ctx) {
      const {
        product_id: productId,
        product_name: productName,
        price,
        inventory,
      } = ctx.request.body;
      await sleep(1);

      this.success(ctx, {
        product_id: productId,
        product_name: productName,
        price,
        inventory,
      });
    }

    async get(ctx) {
      const { product_id: productId } = ctx.request.query;
      await sleep(1);
      const productList = this.getProductList(ctx);
      const productItem = productList.find(
        (item) => item.product_id === productId
      );

      this.success(ctx, productItem);
    }

    async remove(ctx) {
      const { product_id: productId } = ctx.request.body;

      await sleep(1);
      this.success(ctx, {
        proj_key: ctx.projKey,
        product_id: productId,
      });
    }

    async getList(ctx) {
      const { product_name: productName, page, size } = ctx.request.query;
      await sleep(1);

      let productList = this.getProductList(ctx);
      if (productName && productName !== "all") {
        productList = productList.filter(
          (item) => item.product_name === productName
        );
      }

      this.success(ctx, productList, {
        total: 3,
        page,
        size,
      });
    }

    getProductEnumList(ctx) {
      this.success(ctx, [
        {
          label: "全部",
          value: "all",
        },
        {
          label: `${ctx.projKey} - 《水果》`,
          value: `${ctx.projKey} - 《水果》`,
        },
        {
          label: `${ctx.projKey} - 《西瓜》`,
          value: `${ctx.projKey} - 《西瓜》`,
        },
        {
          label: `${ctx.projKey} - 《香蕉》`,
          value: `${ctx.projKey} - 《香蕉》`,
        },
      ]);
    }

    getProductList(ctx) {
      return [
        {
          product_id: "1",
          product_name: `${ctx.projKey} - 《水果》`,
          price: 39.9,
          inventory: 9999,
          create_time: "2023-01-01 10:55:00",
        },
        {
          product_id: "2",
          product_name: `${ctx.projKey} - 《西瓜》`,
          price: 199,
          inventory: 9999,
          create_time: "2023-01-01 13:22:00",
        },
        {
          product_id: "3",
          product_name: `${ctx.projKey} - 《香蕉》`,
          price: 699,
          inventory: 9999,
          create_time: "2023-01-01 11:22:00",
        },
      ];
    }
  };
};
