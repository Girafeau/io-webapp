import { Colors } from "./styled";
import { DefaultTheme } from "styled-components";

export function colors(): Colors {
    return {
        primary: '#3761DC',
        secondary: '#ee00ff',
        grey: '#a1a1a1',
        black: 'rgb(15, 16, 19)',
        purple: '#572da1'
    }
}

export function theme(): DefaultTheme {
    return {
        ...colors()
    }
}
