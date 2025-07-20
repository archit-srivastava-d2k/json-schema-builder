
import { FormField } from '../types';
import { Space, Input } from 'antd';

interface SchemaBuilderProps {
  fields: FormField[];
}

export const SchemaBuilder = ({ fields }: SchemaBuilderProps) => {
  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <Space>
            <Input value={field.key} readOnly />
            <Input value={field.type} readOnly style={{ width: '120px' }} />
          </Space>
        </div>
      ))}
    </div>
  );
};