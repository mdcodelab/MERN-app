import React from "react";
import styled from "styled-components";

function Logo() {
  return (
    <Wrapper>
      <div className="logo__content">
        <h2>W</h2>
        <h4>Work Wave Hub</h4>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .logo__content {
    display: flex;
    align-items: center;
    height: 100%;
    width: max-content;
    justify-content: space-between;
    margin: 0 auto;
  }

  .logo__content h2 {
    margin: 0;
    margin-right: 0.3rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-500);
    color: #fff;
  }

  .logo__content h4 {
    color: var(--primary-500);
    margin: 0;
    font-weight: bold;
    letter-spacing: 0.005rem;
    font-size: 1.3rem;
  }
`;

export default Logo;
