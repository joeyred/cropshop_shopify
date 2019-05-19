import {
  Button,
  Card,
  Spinner,
  DisplayText,
  Layout,
  Page,
  Stack,
  TextField
} from '@shopify/polaris';

import Cookies from 'js-cookie';
import axios from 'axios';
import _ from 'lodash';

const MESSAGES = [
  'Scanning installed Themes',
  'Published Theme Found - Adding Assets',
  'Assets Added - '

];

class Install extends React.Component {
  state = {
    loading: false,
    loadingMessage: '',
    themes: [],
    themeID: '',
    // shopOrigin: Cookies.get('shopOrigin'),
    // sessionToken: Cookies.get('')
  }
  componentDidMount() {
    this.setState({
      loading: true,
      loadingMessage: MESSAGES[0]
    });
    this.getThemes();
  }
  getThemes = () => {
    const shopOrigin = Cookies.get('shopOrigin');
    const sessionToken = Cookies.get('sessionToken');
    // const {shopOrigin} = this.state;
    axios.get(
      `https://${shopOrigin}/admin/2019-04/themes.json`,
      {headers: { 'X-Shopify-Access-Token': sessionToken}}
    )
      .then(response => {
        console.log(response);
        this.setState({
          loadingMessage: MESSAGES[1],
          themes: response.data,
          themeID: _.filter(response.data, {role: 'main'})[0].id
        });
      })
      .then(() => {
        // this.setState({
        //   themeID: _.filter(response, {role: 'main'})[0].id
        // });
        this.addAssets();
      })
      .catch(error => {
        console.log('Error fetching and parsing data');
      });
  };
  addAsset = () => {

  };
  addAssets = () => {
    console.log('asset stuff');
  };

  render() {
    const {
      loadingMessage
    } = this.state;
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Spinner size="large" color="teal" />
              <DisplayText size="medium">{loadingMessage}</DisplayText>
            </Card>


          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default Install;
