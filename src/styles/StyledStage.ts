import styled from "@emotion/styled";

import { STAGE_SIZE } from "../gameUtils";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${STAGE_SIZE}, 1fr);
  grid-template-columns: repeat(${STAGE_SIZE}, 1fr);
  border: 0.1em solid slategray;
  min-height: 1000px;
`;

export const StyledGameStats = styled.div`
  display: flex;
  color: snow;
  font-size: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: gray;

  > button {
    font-size: 2rem;
    color: slategray;
    background-color: snow;
    border-radius: 0.3em;
    border: 0;
    padding: 0.3em;
    cursor: pointer;
  }
`;

export const StyledStageContainer = styled.div`
  max-width: min(1000px, 100% - 1em);
  margin: auto;
`;
