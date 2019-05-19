import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Form,
  FormLayout,
  Stack,
  TextField,
  DisplayText,
  Select,
  Heading,
  Subheading,
} from '@shopify/polaris';

import './ButtonGenerator.css';

class ButtonGenerator extends React.Component {
  static defaultProps = {
    collections: [
      {label: 'Example 1', value: 'example-1_id'},
      {label: 'Example 2', value: 'example-2_id'}
    ]
  };
  static propTypes = {
    collections: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  };

  state = {
    snippet: '',
    collection: '',
    text: ''
  };
  componentDidMount() {
    const {collections} = this.props;
    this.setState({ collection: collections[0].value });
  }

  handleCollectionSelection(newValue) {
    this.setState({collection: newValue});
  }

  handleTextChange(newValue) {
    this.setState({text: newValue});
  }

  handleChange = field => {
    return value => this.setState({ [field]: value });
  };

  render() {
    const {collections} = this.props;
    const {} = this.state;
    return (
      <Card title='Button Snippet Generator' sectioned>
        <FormLayout>
          <Select
            label='Choose a Collection'
            options={collections}
            onChange={this.handleChange('collection')}
            value={this.state.collection}
          />
          <TextField
            label='Write what you want the button to say'
            onChange={this.handleChange('text')}
            value={this.state.text}

          />
          <Subheading>Copy & Paste</Subheading>
        </FormLayout>
        <pre className='fsi__codeblock'>
          <code>
            {`{% include fsi_button collection="${this.state.collection}" text="${this.state.text}" %}`}
          </code>
        </pre>
      </Card>
    );
  }
}

export default ButtonGenerator;
