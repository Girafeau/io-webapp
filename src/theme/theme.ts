import { Colors } from "./styled";
import { DefaultTheme } from "styled-components";

export function colors(): Colors {
    return {
        primary: '#3761DC',
        secondary: '#ffbb1b',
        grey: '#a1a1a1',
        black: 'black',
        purple: '#572da1'
    }
}

export function theme(): DefaultTheme {
    return {
        ...colors()
    }
}