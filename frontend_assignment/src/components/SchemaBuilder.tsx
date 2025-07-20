import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Space, Input, Select } from 'antd';
import { SchemaFormValues } from '../types';

export const SchemaBuilder = () => {
  const { control } = useFormContext<SchemaFormValues>();

  const { fields } = useFieldArray({
    control,
    name: 'schema',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: '10px' }}>
          <Space>
            <Controller
              name={`schema.${index}.key`}
              control={control}
              render={({ field }) => <Input {...field} placeholder="Field Name" />}
            />

            <Controller
              name={`schema.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: 120 }}>
                  <Select.Option value="String">String</Select.Option>
                  <Select.Option value="Number">Number</Select.Option>
                  <Select.Option value="Nested">Nested</Select.Option>
                </Select>
              )}
            />
          </Space>
        </div>
      ))}
    </div>
  );
};