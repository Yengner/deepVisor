'use client';

interface IntegrationButtonProps {
  platform: string;
  onClick: () => void;
}

const IntegrationButton: React.FC<IntegrationButtonProps> = ({ platform, onClick }) => (
  <button className="integration-button" onClick={onClick}>
    Integrate {platform}
  </button>
);

export default IntegrationButton;
