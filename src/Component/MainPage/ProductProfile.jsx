
import './ProductProfile.css';
import { IonIcon } from '@ionic/react';
import { chevronBack, chevronForward, removeOutline, addOutline, bagHandleOutline } from 'ionicons/icons';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function ProductProfile() {

    const { id } = useParams(); // Get the ID from URL parameter
    const [product, setProduct] = useState(null); // State to store the product data
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0); // Initialize price to 0
    const discountPercentage = 50; // Example discount percentage
    const [sliderPos, setSliderPos] = useState(0); // Initial slider position
    const totalSliderItems = 4; // Total number of slider items

    // Function to fetch product details based on the ID
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                setPrice(response.data.price*(1 -discountPercentage/100));
                 // Set the fetched product data
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [id]); // Trigger the effect when the ID changes

    // Function to increase product quantity
    const increaseProductQty = () => {
        if(quantity<10){
            setQuantity(quantity + 1);

        }
        
    };

    // Function to decrease product quantity
    const decreaseProductQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const slideToNext = () => {
        if (sliderPos < totalSliderItems - 1) {
            setSliderPos(sliderPos + 1);
        }
    };

    const slideToPrev = () => {
        if (sliderPos > 0) {
            setSliderPos(sliderPos - 1);
        }
    };

   // Render loading message if product data is still being fetched or if product images are not available
    if (!product) {
        return <p>Loading...</p>;
    }
    

    return (

        <section className="section product" aria-label="product">
            <div className="container">

                <div className="product-slides" >

                    <div className="slider-banner" style={{ transform: `translateX(-${sliderPos * 100}%)` }} >
                        <figure className="product-banner">
                            <img src={product.images[0]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>

                        <figure className="product-banner">
                            <img src={product.images[1]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>

                        <figure className="product-banner">
                            <img src={product.images[2]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>

                        <figure className="product-banner">
                            <img src={product.images[3]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>
                    </div>

                    <button className="slide-btn prev" aria-label="Previous image" onClick={slideToPrev}>
                        <IonIcon icon={chevronBack} aria-hidden="true" />
                    </button>

                    <button className="slide-btn next" aria-label="Next image" onClick={slideToNext}>
                        <IonIcon icon={chevronForward} aria-hidden="true" />

                    </button>

                </div>

                <div className="product-content">

                    <p className="product-subtitle">The Antique Store</p>

                    <h1 className="h1 product-title">Limited Edition Statue</h1>

                    <p className="product-text">
                        These low-profile sneakers are your perfect casual wear companion. Featuring a
                        durable rubber outer sole, they’ll withstand everything the weather can offer.
                    </p>

                    <div className="wrapper">

                        <span className="price" >${price}</span>

                        <span className="badge">{discountPercentage}%</span>

                        <del className="del">{product.price}</del>

                    </div>

                    <div className="btn-group">

                        <div className="counter-wrapper">

                            <button className="counter-btn" onClick={decreaseProductQty}>
                                <IonIcon icon={removeOutline} />
                            </button>

                            <span className="price">{quantity}</span>

                            <button className="counter-btn" onClick={increaseProductQty}>
                                <IonIcon icon={addOutline} />

                            </button>

                        </div>

                        <button className="cart-btn">
                            <IonIcon icon={bagHandleOutline}/>

                            <span className="span">Add to cart</span>
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );

}