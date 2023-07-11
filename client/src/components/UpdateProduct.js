import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [msg, setMsg] = useState(false);
    const [msgVal, setMsgVal] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getProductData();
    },[]);

    const getProductData = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        const product = await result.json();
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setCompany(product.company);
        console.log("DATA: ", product);
    }

    const updateProductData = async () => {
        let upResult = await fetch(`http://localhost:5000/product/${params.id}`,
        {
            method: "Put",
            body: JSON.stringify({name, price, company, category}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        upResult = await upResult.json();
        if(upResult){
            setMsg(true);
            setMsgVal("Record Saved Successfully!");
            console.log("Element Clicked", upResult);
            setTimeout(() => {
                navigate("/");
            },2000);
        }
        else{
            setMsgVal("Oops! the record has not een saved.");
        }
        
        
    }

    return(
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Update Product</h2>
            </div>
            
                <div> 
                    <input className="inputBox" type="text" placeholder="Enter Product Name" value={name} onChange={e => setName(e.target.value)}/>
                    <input className="inputBox" type="text" placeholder="Enter Price" value={price} onChange={e => setPrice(e.target.value)} />
                    <input className="inputBox" type="text" placeholder="Enter Company" value={company} onChange={e => setCompany(e.target.value)} />
                    <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={e => setCategory(e.target.value)} />
                    <button type="button" className="btn" onClick={updateProductData}>Update Product</button>
                </div>
                {msg ? <p className="successMsg">{msgVal}</p> : <p className="errorMsg">{msgVal}</p>}
        </div>
    )
}

export default UpdateProduct;