import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import {Box, Flex} from "reflexbox";
import {Title} from "../components/Text";
import {Card} from "rebass";
import {Button} from "../components/Button";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {Cosmetic} from "../api/shop.api";
import {getCosmetics} from "../actions/shop";

const Shop = () => {
    const dispatch = useAppDispatch();
    const cosmetics = useAppSelector(state => state.shop.cosmetics);
    useEffect(() => {
        (async function fetch() {
            dispatch(await getCosmetics());
        })();
    }, []);

    return (<React.Fragment>
        <NavBar/>
        <Flex m={4}>
            <Box>
                <Title>Shop</Title>
                {
                    cosmetics.map((cosmetic: Cosmetic, i: number) => <Box>
                    <Card width={256} backgroundColor={'rgb(33, 36, 41)'} key={i}>
                        {cosmetic.name}
                    </Card>
                    <Button>Buy for {cosmetic.price}$</Button>
                </Box>)
                }
            </Box>

        </Flex>
    </React.Fragment>)
}

export default Shop;
