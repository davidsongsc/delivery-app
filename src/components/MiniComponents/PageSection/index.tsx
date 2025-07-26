'use client';

import React from 'react';
import { Button, Col, Row, Typography } from 'antd';

const { Title } = Typography;

interface PageSectionProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  extra?: React.ReactNode;
}

const PageSection: React.FC<PageSectionProps> = ({
  title,
  buttonText,
  onButtonClick,
  buttonType = 'primary',
  extra,
}) => {
  return (
    <Row justify="space-between" align="middle" className="mb-4">
      <Col>
        <Title level={2}>{title}</Title>
      </Col>
      <Col className="flex items-center gap-2">
        {extra}
        <Button type={buttonType} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};

export default PageSection;
