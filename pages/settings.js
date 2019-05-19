import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField
} from '@shopify/polaris';

class Settings extends React.Component {
  state = {
    filstackAPIKey: 'xxxxxxxxxxxxxxxxxxxxxxx'
  }
  handleSubmit = () => {
    this.setState({
      filstackAPIKey: this.state.filstackAPIKey
    });
    console.log('submission', this.state);
  };
  handleChange = field => {
    return value => this.setState({ [field]: value });
  };

  render() {
    const {filstackAPIKey} = this.state;
    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Filestack API Key"
            description="Connect your Filestack account via inputting the API key."
          >
            <Card sectioned>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <TextField
                    value={filstackAPIKey}
                    onChange={this.handleChange('filstackAPIKey')}
                    label="API Key"
                    type="key"
                  />
                  <Stack distribution="trailing">
                    <Button primary submit>
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>

        </Layout>
      </Page>
    );
  }
}

export default Settings;
