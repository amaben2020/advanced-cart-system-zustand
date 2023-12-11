export class Orders {
  async getAll() {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/orders/get-orders`,
      );

      const response = await data.json();

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
