import React, { useState } from "react";
import { updateProduct } from "../../services/ProductService";
const ProductEdit = ({product}) => {
    const [notefication, setNotefication] = useState(null);
    const [loadingUpdate, setLoadingSubmit] = useState(false);


    const hamdleSubmit = async(e) => {
        if(!validateImpts()){
            return;
        }

    }
    const validateImpts = () => {
        if(product.name == null){
            alert("el campo nombre de porducto no puede ser vacia")
        }

    }
    return(
       <div className="container-product">
        {notefication && (
            <div className="siuu"></div>
        )}
        <h2>estes el contenido de editar producto</h2>
       </div> 
    )
}
export default ProductEdit;