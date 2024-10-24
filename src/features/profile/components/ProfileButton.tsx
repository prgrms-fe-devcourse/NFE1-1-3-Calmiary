import styled from 'styled-components';

interface ButtonPropTypes {
  width?: string;
  height?: string;
  color?: string;
  opacity?: number;
}

const ProfileButton = styled.button<ButtonPropTypes>`
  width: ${({ width }) => width || '264px'};
  height: ${({ height }) => height || '57px'};
  background-color: ${({ color }) => color || '#9C99AE'};
  opacity: ${({ opacity }) => (opacity !== undefined ? opacity : 1)};
  border: none;
  border-radius: 1rem;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

export default ProfileButton;
