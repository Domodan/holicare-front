import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./main";
// import { Box } from "@mui/material";
const Homepage = (props) => {
  return (
    <Container>
      <Box>
        
        <Main />
        <LeftSide />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 5px;
  max-width: 100%;
  font-family: Arial;
`;

const Box = styled.div`
  display: grid;
  grid-template-areas: " main leftside";
  grid-template-columns: minmax(350px, 6fr) minmax(350, 12fr) minmax(350px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /*grid-template-row: auto;*/
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Homepage;
