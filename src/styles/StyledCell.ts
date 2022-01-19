import styled from "@emotion/styled";

import { CellType } from "../gameUtils";

export const StyledCell = styled.div<{
  cellType: CellType;
}>`
  background-color: ${({ cellType }) =>
    cellType === "empty"
      ? "transparent"
      : cellType === "fruit"
      ? "red"
      : cellType === "snake_body"
      ? "green"
      : "yellow"};
`;
