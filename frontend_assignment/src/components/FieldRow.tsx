import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { Input, Select, Button, Space, Switch } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { FieldArrayPath } from 'react-hook-form';
import { SchemaBuilder } from './SchemaBuilder';
import type { SchemaFormValues } from '../types';

interface FieldRowProps {
  name: FieldArrayPath<SchemaFormValues>;
  index: number;
  remove: (index: number) => void;
}

export const FieldRow = ({ name, index, remove }: FieldRowProps) => {
  const { control, formState: { errors } } = useFormContext<SchemaFormValues>();
  const fieldName = `${name}.${index}` as const;

  const fieldType = useWatch({ control, name: `${fieldName}.type` });
  
  const hasError = Array.isArray(errors.schema) && (errors.schema[index] as any)?.key;

  return (
    <div style={{ marginLeft: '20px', marginTop: '10px', paddingLeft: '15px', borderLeft: '2px solid #f0f0f0' }}>
      <Space align="start" direction="vertical" style={{ width: '100%' }}>
        <Space align="start">
          <Controller
            control={control}
            name={`${fieldName}.key`}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Field Name" status={hasError ? 'error' : ''} />
            )}
          />
          <Controller
            control={control}
            name={`${fieldName}.type`}
            render={({ field }) => (
              <Select {...field} style={{ width: 120 }} placeholder="Field Type">
                <Select.Option value="String">String</Select.Option>
                <Select.Option value="Number">Number</Select.Option>
                <Select.Option value="Nested">Nested</Select.Option>
              </Select>
            )}
          />
          <Controller
            name={`${fieldName}.isArray`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Space>
                <span>Array</span>
                <Switch checked={value} onChange={onChange} />
              </Space>
            )}
          />
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => remove(index)} />
        </Space>
        
        {fieldType === 'Nested' && (
          <SchemaBuilder name={`${fieldName}.children` as FieldArrayPath<SchemaFormValues>} />
        )}
      </Space>
    </div>
  );
};