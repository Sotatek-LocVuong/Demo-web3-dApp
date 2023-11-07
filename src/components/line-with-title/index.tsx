import React from 'react';
import { Space } from 'antd';

interface IProps {
  title: string;
  note?: string;
  content: string | number;
}

export const LineWithTitle: React.FC<IProps> = ({
  title,
  note = '',
  content
}: IProps) => (
  <Space>
    <span style={{ fontWeight: 'bold' }}>
      {title + (note ? ` (${note})` : '')}:{' '}
    </span>
    <span>{content}</span>
  </Space>
);
