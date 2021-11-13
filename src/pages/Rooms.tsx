import React, {useEffect} from "react";
import NavBar from "../components/NavBar";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {getRooms} from "../actions/game";
import {Room} from "../api/game.api";
import {Box} from "rebass";
import {Flex} from "reflexbox";
import {Title} from "../components/Text";
import useTheme from "../hooks/useTheme";
import {ButtonLink} from "../components/Button";
import {Container} from "../components/Container";

const Rooms = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const rooms = useAppSelector(state => state.game.rooms);
    useEffect(() => {
        (async function fetch() {
            dispatch(await getRooms(0, 20));
        })();
    }, []);

    return (<React.Fragment>
        <NavBar/>
        <Flex m={4}>
            <Box>
                <Title>Rooms available</Title>
                {
                    rooms.map((room: Room) =>
                        <Container>
                            <div>{room.name}</div>
                            <div>{room.current + ' / ' + room.max}</div>
                            <ButtonLink to={`/battle/${room.name}`}>Join</ButtonLink>
                        </Container>
                    )
                }
            </Box>
        </Flex>
    </React.Fragment>)
}

export default Rooms;
