// src/types.ts

export interface FormField {
  key: string;
  type: 'String' | 'Number' | 'Nested';
}
export interface SchemaFormValues {
  schema: FormField[];
}