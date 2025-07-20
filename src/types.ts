


export interface FormField {
  key: string;
  type: 'String' | 'Number' | 'ObjectId' | 'Float' | 'Boolean' | 'Nested';
  isArray?: boolean;
  children?: FormField[];
}
export interface SchemaFormValues {
  schema: FormField[];
}