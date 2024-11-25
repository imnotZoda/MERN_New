import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
} from "mdb-react-ui-kit";
import { useDispatch } from 'react-redux';
import { addToCart } from '../state/cartSlice';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    const addProductToCart = () => {
        dispatch(
            addToCart({
                ...product,
                quantity: 1,
            })
        );
    };

    return (
        <MDBCard
            style={{
                borderRadius: "20px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                maxWidth: "300px",
                backgroundColor: "#D4D8DD",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%", // Ensure equal height for all cards
            }}
        >
            {/* Image Section */}
            <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
            >
                <MDBCardImage
                    src={product.images[0].url}
                    fluid
                    className="w-100"
                    style={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        height: "200px",
                        objectFit: 'cover',
                    }}
                />
                <a href="#!">
                    <div
                        className="mask"
                        style={{
                            background: "rgba(0, 0, 0, 0.1)",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                        }}
                    ></div>
                </a>
            </MDBRipple>

            {/* Card Body */}
            <MDBCardBody style={{ padding: "15px", flexGrow: 1 }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h6 className="mb-1" style={{ fontWeight: "bold", color: "#1A2D42" }}>
                            {product.name}
                        </h6>
                        <p
                            className="small text-muted mb-0"
                            style={{ color: "#2E4156" }}
                        >
                            {product.category}
                        </p>
                    </div>
                    <div className="text-danger">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <p className="small text-muted mb-0">4.0/5</p>
                    </div>
                </div>

                <hr style={{ borderTop: "1px solid #AAB7B7" }} />

                {/* Price and Stock */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <p
                        className="mb-0"
                        style={{ fontWeight: "bold", color: "#1A2D42" }}
                    >
                        PHP {product.sell_price}
                    </p>
                    <p
                        className="small text-muted mb-0"
                        style={{ color: "#2E4156" }}
                    >
                        Stocks: {product.stock_quantity}
                    </p>
                </div>
            </MDBCardBody>

            <hr style={{ borderTop: "1px solid #AAB7B7", margin: 0 }} />

            {/* Buy Button */}
            <div
                className="d-flex justify-content-center"
                style={{
                    padding: "15px",
                }}
            >
                <MDBBtn
                    color="primary"
                    style={{
                        borderRadius: "15px",
                        backgroundColor: "#1A2D42",
                        border: "none",
                        width: "100%",
                        fontWeight: "bold",
                    }}
                    onClick={addProductToCart}
                >
                    Buy Now
                </MDBBtn>
            </div>
        </MDBCard>
    );
}
