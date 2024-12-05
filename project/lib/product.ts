export class Product {

    public product_id : number;
    private product_name: string;
    private price : number;
    private img_path: string;
    private category_name : string;
    private add_date : string;
    private color_name?: string;
    private size_name?: string;
    private target?: string;
    private stock? : number;

    constructor(product_id:number, product_name:string, price:number, img_path:string, category_name: string, add_date: string, color_name?:string, size_name?: string, target?: string, stock?:number) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.price = price;
        this.img_path = img_path;
        this.category_name = category_name;
        this.add_date = add_date;
        this.color_name = color_name;
        this.size_name = size_name;
        this.target = target;
        this.stock = stock;
      }
    
    public getHomeProperty (): [number, string, string, number, string, string] {
        return [this.product_id, this.product_name, this.category_name, this.price, this.img_path, this.add_date]
    }
    
    // 在庫が0個以上か確認
    isAvailable() {
        if(typeof this.stock === "number") {
            return this.stock > 0;
        }

        return false;
    }

    // 在庫を注文個数分減らす
    decrease(order_num: number) {
        if(typeof this.stock === "number") {
            this.stock -= order_num;
        }
    }
}