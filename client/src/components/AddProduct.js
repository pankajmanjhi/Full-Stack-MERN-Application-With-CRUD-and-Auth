import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    let showError = false;

    const addProductData = async ()=> {
        console.log(!name);
        if(!name || !price || !company || !category){
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(name, price, company, category, userId);

        let result = await fetch("http://localhost:5000/add-product", 
        {
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(result){
            console.log(result);
            setTimeout(
                () => navigate("/"),
                2000
              )
        }
        else{
            showError = true;
        }
    };

    return(
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Add Product</h2>
            </div>
            <input className="inputBox" type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                {error && !name && <p className="error-text">Please Enter Product Name</p> }
            <input className="inputBox" type="text" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                {error && !price && <p className="error-text">Please Enter Product Price</p> }
            <input className="inputBox" type="text" placeholder="Enter Company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
                {error && !company && <p className="error-text">Please Enter Product Company</p> }
            <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                {error && !category && <p className="error-text">Please Enter Product Category</p> }
            <button type="button" className="btn" onClick={addProductData}>Add Product</button>

            {showError ? <p className="noProduct">Problem adding product!</p> : ""}
        </div>
    );
}

export default AddProduct;