import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {
        let result =  await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
        if(result){
            console.log(result);
        }
        else{
            console.log('No records found!');
        }
        //console.log("RESULT: "+JSON.stringify(products));
    }

    const deleteProduct = async(productId) => {
        console.log("PID: "+productId);
        let result = await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'Delete'
        });
        result = await result.json();
        if(result){
            alert('record deleted!');
            getProducts();
        }
        else{
            alert('something went wrong!');
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }
        else{
            getProducts();
        }
        
    }

    return(
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Product List</h2>
            </div>
            <input type="text" placeholder="Search" className="searchTB" onChange={searchHandle}/>
            <ul>
                <li className="listHeading">Sl. No.</li>
                <li className="listHeading">Product Name</li>
                <li className="listHeading">Price</li>
                <li className="listHeading">Company</li>
                <li className="listHeading">Category</li>
                <li className="listHeading">Actions</li>
            </ul>
            {
                products.length>0 ? 
                products.map((item,index) => 
                    <ul key={index}>
                        <li>{index}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li>
                            <Link to={`/update/${item._id}`}>
                                <img 
                                    className="icons"
                                    src="https://cdn-icons-png.flaticon.com/512/7398/7398464.png"
                                    alt="edit icon"
                                />
                            </Link>
                            
                            <img
                                className="icons"
                                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                alt="delete icon"
                                onClick={() => deleteProduct(item._id)}
                            />
                        </li>
                    </ul>
                )
                : <p className="noProduct">No Products Found!</p>   
            }

        </div>
    );

}

export default ProductList;