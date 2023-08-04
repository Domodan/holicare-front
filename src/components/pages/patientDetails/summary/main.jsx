import styled from "styled-components";
import Vitals from "./vitals";
import Biometrics from "./biometrics";
import Conditions from "./conditions";
import Allergies from "./allergies";

function Main() {
  return (
    <Container>
      <ShareBox>
        <div>
          <h3>Patient Details</h3>
        </div>
      </ShareBox>
      <div>
        <Article>
          <div>
            <Vitals />
          </div>
        </Article>
      </div>

      <div>
        <Article>
          <div>
            <Biometrics />
          </div>

        </Article>
      </div>
      <div>
        <Article>
          <div>
            <Conditions />
          </div>
        </Article>
      </div>
      <div>
        <Article>
          <div>
            <Allergies />
          </div>
        </Article>
      </div>
      {/* <div>
        <Article>
              <div>
                <h3>
                  Active Medications
                  
                </h3>
              </div>


          <ArticleButtons>
            <button>
              <img src="/images/share.png" alt=""></img>
              <span>Add</span>
            </button>
          </ArticleButtons>
        </Article>
      </div> */}
    </Container>
  );
}

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  align-items: center;
  color: #958b7b;
  margin 0 0 8px;
  background: white;
  justify-content: space-between;

  div {
      button {
          outline: none;
          color: rgba(0, 0, 0, 0.6);
          font-size: 12px;
          line-height: 1;
          min-height: 60px;
          background: transparent;
          border: none;
          display: inline-flex;
          align-items: center;
          font-weight: 600;

          
          &:hover {
            background-color: rgba(0, 0, 0, 0.09);
          }
      }
      &:first-child {
          display: flex;
          align-items: center;
          padding: 8px 10px 0px 10px;
          img{
              margin-right: 4px;
          }
          button {
              flex-grow: 1;
              border-radius: 20px;
              padding-left: 10px;
              
          }
      }
      &:nth-child(2) {
          color: rgba(0, 0, 0, 0.6)
      }
  }

`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 18px 0 18px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    align-items: center;

    img {
      width: 48px;
      height: 48px;
      border: 2px solid #000;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      justify-content: column;

      h3 {
        text-align: left;
        font-size: 18px;
        font-weight: 800;
        color: #5ab2da;

        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 16px;
          height: 16px;
          border: none;
          margin-right: 2px;
        }
        span {
          margin-left: 0px;
          margin-right: 15px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
          align-items: center;
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
    }
    img {
      border: none;
      width: 24px;
      height: 24px;
    }
  }
`;

const MessageBox = styled.div`
  font-family: Arial;
  font-size: 16px;
  display: flex;
  padding: 10px;
  margin-left: 8px;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
`;

const ActionsPub = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.5);
  align-items: center;
  margin-right: 10px;
  padding: 0px 8px 16px 16px;

  img {
    border: none;
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  div {
    display: flex;
    span {
      margin-right: 8px;
    }
  }
`;

const ArticleButtons = styled.div`
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  button {
    text-align: center;
    padding: 5px 36px 5px 36px;
    margin-bottom: 16px;
    border: none;
    border-radius: 20px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
    }

    img {
      border: none;
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
`;

export default Main;
