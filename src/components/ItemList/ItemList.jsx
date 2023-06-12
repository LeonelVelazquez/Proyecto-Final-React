import Cards from "../Cards/Cards";
import FlexWrapper from "../flexWrapper/flexWrapper";

import React from "react";

const ItemList = ({ item }) => {
    return (
        <>
            <FlexWrapper>
                {item.map((item) => (
                    <Cards
                        key={item.id}
                        id={item.id}
                        item={item.id}
                        title={item.title}
                        price= {item.price}
                        detail={item.detail}
                        imgurl={item.imgurl}
                        discount={item.discount}
                        stock={item.stock}
                    />
                ))}
            </FlexWrapper>
        </>
    );
};

export default ItemList;