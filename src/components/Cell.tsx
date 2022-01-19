import { StyledCell } from "../styles/StyledCell";

import { CellType } from "../gameUtils";

type Props = {
  type: CellType;
};

const Cell = ({ type }: Props) => {
  return <StyledCell cellType={type} />;
};

export default Cell;
