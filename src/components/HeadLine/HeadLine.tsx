import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { toggleModal } from '../../features/actions/projects.actions'

const HeadLine = (): JSX.Element => {
  
  const dispatch = useDispatch()

  return (
    <HeadLineStyled className="headline">
      <div className="headline-bloc"> 
        <p>
          No matter where we come from, we are all brothers and sisters in
          humanity, With Next-Crowdfunding platform, we do not force you to an amount or you
          will help someone in this world achieve their dream or be able to save
          them from a huge problem. And if you have a cause to discuss, download
          a short video here where you will explain your needs in detail.
        </p>
        <div className="button-container">
          <Button
            className="open-modal-button"
            onClick={() => dispatch(toggleModal(true))}
          >
            get started
          </Button>
        </div>
      </div>
      <div className="headline-bloc">
        <img src="./crowdfunding.jpeg" alt="headline-img" />
      </div>
    </HeadLineStyled>
  )
}

const HeadLineStyled = styled.section`
  .headline-bloc {
    width: 45%;
    margin: 0 10px;
    font-size: 16px;
  }
  img {
    width: 80%;
  }
  .open-modal-button {
    margin: 0px;
    padding: 8px 16px;
    color: white;
    background-color: rgb(73, 185, 236);
    border: 0px;
    border-radius: 4px;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default HeadLine
