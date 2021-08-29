import React, {useEffect, useState} from "react";
import ShopService, {Cosmetic} from '../services/shop.service';
import NavBar from "../components/NavBar";
import {Box, Flex} from "reflexbox";
import {Title} from "../components/Text";
import {Card} from "rebass";
import {Button} from "../components/Button";

const Shop = () => {
    const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
    const list = cosmetics.map(({name, image, price}, i) => <Box>
        <Card width={256} backgroundColor={'rgb(33, 36, 41)'} key={i}>
            {name}
        </Card>
        <Button>Buy for {price}$</Button>
    </Box>);
    useEffect(() => {
        ShopService.getCosmetics().then(res => setCosmetics(res));
    }, []);

    return ( <React.Fragment>
        <NavBar/>
        <Flex m={4}>
            <Box>
                <Title>Shop</Title>

                {list}
            </Box>

        </Flex>
    </React.Fragment>)
}

export default Shop;
