// src/App.tsx

import { useForm, FormProvider } from 'react-hook-form'; 
import { Layout, Typography, Row, Col, Card } from 'antd';
import { SchemaBuilder } from './components/SchemaBuilder';
import { SchemaFormValues } from './types'; 

const { Header, Content } = Layout;
const { Title } = Typography;

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
                  <code></code>
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