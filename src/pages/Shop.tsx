import React, {useEffect, useState} from "react";
import ShopService from '../services/shop.service';

const Shop = () => {
    const [cosmetics, setCosmetics] = useState([]);
    useEffect(() => {
        async function fetch() {
            setCosmetics(await ShopService.getCosmetics());
        }
        fetch();
    }, []);
    return (<div>ok</div>)
}

export default Shop;
