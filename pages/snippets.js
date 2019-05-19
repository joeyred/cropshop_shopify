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
import ButtonGenerator from '../components/ButtonGenerator';

class Snippets extends React.Component {
  // handleSubmit = () => {
  //   this.setState({
  //     filstackAPIKey: this.state.filstackAPIKey
  //   });
  //   console.log('submission', this.state);
  // };
  handleChange = field => {
    return value => this.setState({ [field]: value });
  };

  render() {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <ButtonGenerator />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

export default Snippets;
