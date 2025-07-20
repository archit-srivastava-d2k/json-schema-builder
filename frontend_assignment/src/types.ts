

export interface FormField {
  key: string;
  type: 'String' | 'Number' | 'Nested';
  isArray?: boolean;
  children?: FormField[];
}

export interface SchemaFormValues {
  schema: FormField[];
}