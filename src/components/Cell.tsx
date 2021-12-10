import StyledCell from "../styles/StyledCell";

export type Props = {
    type: "food" | "snake" | "empty"
} 

const Cell = ({ type = "empty" }: Props) => 
    <StyledCell type={type}/>

export default Cell;