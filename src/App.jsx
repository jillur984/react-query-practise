import AddProduct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";

export default function App() {


  return (
   <div className="flex m-2">
    <AddProduct/>
   <ProductList/>
   <ProductDetail id={1}/>
   
   </div>
  )
}
