
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FieldArrayPath } from 'react-hook-form';
import { FieldRow } from './FieldRow';
import type { SchemaFormValues, FormField } from '../types';

interface SchemaBuilderProps {
  name: FieldArrayPath<SchemaFormValues>;
}

export const SchemaBuilder = ({ name }: SchemaBuilderProps) => {
  const { control } = useFormContext<SchemaFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name });

  const watchedFields: FormField[] = useWatch({ control, name });
  const isAddButtonDisabled =
    watchedFields && watchedFields.length > 0 &&
    !watchedFields[watchedFields.length - 1]?.key;

  const addField = () => {
    append({ key: '', type: 'String', isArray: false, children: [] });
  };

  return (
    <div style={name !== 'schema' ? { paddingTop: '10px' } : {}}>
      {fields.map((field, index) => (
        <FieldRow 
          key={field.id} 
          name={name} 
          index={index} 
          remove={remove} 
        />
      ))}
      <Button
        type="dashed"
        onClick={addField}
        icon={<PlusOutlined />}
        style={{ marginTop: '10px', marginLeft: '20px' }}
        disabled={isAddButtonDisabled}
      >
        Add Item
      </Button>
    </div>
  );
};