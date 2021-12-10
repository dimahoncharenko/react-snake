import styled from "@emotion/styled";

import bg from "../img/bg.jpg";

export const StyledStage = styled.div`
    > .row
    {
        display: flex;
    }

    > .stats
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-family: sans-serif;
        font-size: 1.2rem;
    }
`;

export const StageWrapper = styled.div`
    display: flex;

    width: 100vw;
    height: 100vh;

    background-image: url(${bg});
    background-size: cover;
    > *
    {
        margin: auto;
    }
`;