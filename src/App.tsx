import { useForm, FormProvider } from 'react-hook-form';
import { Layout, Row, Col, Card } from 'antd';
import { SchemaBuilder } from './components/SchemaBuilder';
import { FormField, SchemaFormValues } from './types';
import { Content } from 'antd/es/layout/layout';

const generateJson = (fields: FormField[]): Record<string, any> => {
  const result: Record<string, any> = {};
  if (!fields) {
    return result;
  }

  for (const field of fields) {
    if (field.key) {
      let singleItemValue: any;
      if (field.type === 'Nested') {
        singleItemValue = generateJson(field.children || []);
      } else if (field.type === 'String') {
        singleItemValue = "";
      } else if (field.type === 'Number') {
        singleItemValue = 0;
      } else if (field.type === 'Float') {
        singleItemValue = 0.0;
      } else if (field.type === 'Boolean') {
        singleItemValue = false;
      } else if (field.type === 'ObjectId') {
        singleItemValue = null;
      }
      
      if (field.isArray) {
        result[field.key] = singleItemValue !== undefined ? [singleItemValue] : [];
      } else {
        result[field.key] = singleItemValue;
      }
    }
  }
  return result;
};

function App() {
  const methods = useForm<SchemaFormValues>({
    defaultValues: {
      schema: [],
    },
    mode: 'onChange',
  });

  const watchedSchema = methods.watch('schema');
  const jsonOutput = JSON.stringify(generateJson(watchedSchema), null, 2);

  return (
    <FormProvider {...methods}>
      <Layout style={{ minHeight: '100vh' , width: '100vw'}}>
        <Content style={{ padding: '24px' }}>
          <Row gutter={24}>
            <Col span={14}>
              <Card title="Schema Builder">
                <SchemaBuilder name="schema" />
              </Card>
            </Col>
            <Col span={10}>
              <Card title="JSON Preview">
                <pre style={{ margin: 0, background: '#f5f5f5', padding: '16px', borderRadius: '4px', minHeight: '400px' }}>
                  <code>{jsonOutput}</code>
                </pre>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </FormProvider>
  );
}

export default App;






