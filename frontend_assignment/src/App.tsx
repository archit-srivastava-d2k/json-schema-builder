import { useForm, FormProvider } from 'react-hook-form';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { SchemaBuilder } from './components/SchemaBuilder';
import { FormField, SchemaFormValues } from './types';

const { Header, Content } = Layout;
const { Title } = Typography;

const generateJson = (fields: FormField[]): Record<string, any> => {
  const result: Record<string, any> = {};
  if (!fields) {
    return result;
  }

  for (const field of fields) {
    if (field.key) {
      if (field.type === 'String') {
        result[field.key] = "";
      } else if (field.type === 'Number') {
        result[field.key] = 0;
      }
    }
  }
  return result;
};


function App() {
  const methods = useForm<SchemaFormValues>({
    defaultValues: {
      schema: [
        { key: 'firstName', type: 'String' },
        { key: 'lastName', type: 'String' },
        { key: 'age', type: 'Number' },
      ],
    },
  });

  const watchedSchema = methods.watch('schema');
  const jsonOutput = JSON.stringify(generateJson(watchedSchema), null, 2);

  return (
    <FormProvider {...methods}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Title level={3} style={{ color: 'white', lineHeight: '64px' }}>JSON Schema Builder</Title>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Row gutter={24}>
            <Col span={14}>
              <Card title="Schema Builder">
                <SchemaBuilder />
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