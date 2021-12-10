import styled from "@emotion/styled";

import { Props as CellProps } from "../components/Cell";

export default styled.div<{
    type: CellProps["type"]
}>`
    --cell-size: 4em;

    width: var(--cell-size);
    height: var(--cell-size);
    border: .05em solid lightgreen;

    background-color: ${props => 
        props.type === "food" ? "hsl(56.95deg, 84.55%, 54.31%)" :
        props.type === "snake" ? "hsl(142deg, 70%,30%)" :
        "transparent"
    };
`;