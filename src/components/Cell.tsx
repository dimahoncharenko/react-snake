import StyledCell from "../styles/StyledCell";
import { CellType } from "../gameHelpers";

export type Props = {
  type: CellType;
};

const Cell = ({ type = "empty" }: Props) => <StyledCell type={type} />;

export default Cell;
