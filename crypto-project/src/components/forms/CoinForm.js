import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class CoinForm extends React.Component {
  state = {
    data: {
      id: this.props.coin.id,
      name: this.props.coin.name,
      price_usd: this.props.coin.price_usd
    },
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        id: props.coin.id,
        name: props.coin.name,
        price_usd: props.coin.price_usd,
      },
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };


  validate = data => {
    const errors = {};
    if (!data.id) errors.id = "Can't be blank";
    if (!data.name) errors.name = "Can't be blank";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Coin id</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    placeholder="id"
                    value={data.id}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.name}>
                  <label htmlFor="name">Coin name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                    value={data.name}
                    onChange={this.onChange}
                  />
                {errors.name && <InlineError text={errors.name} />}
                </Form.Field>
              </Grid.Column>


            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

CoinForm.propTypes = {
  submit: PropTypes.func.isRequired,
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price_usd: PropTypes.string.isRequired,
  }).isRequired
};

export default CoinForm;
