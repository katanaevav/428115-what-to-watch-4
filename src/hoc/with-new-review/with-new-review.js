import React, {PureComponent} from 'react';

const withNewReview = (Component) => {
  class WithNewReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        disableForm: false,
        selectedMark: 5,
      };
    }

    render() {
      const {disableForm, selectedMark} = this.state;

      return <Component
        {...this.props}

        disableForm = {disableForm}

        onPostButtonClick = {(text) => {
          this.setState({
            disableForm: true,
          });

          setTimeout(() => {
            console.log(selectedMark, text);
            this.setState({
              disableForm: false,
            });
          }, 2000);
        }}
        onMarkChange = {(evt) => {
          this.setState({
            selectedMark: parseInt(evt.target.value, 10),
          });
        }}
      >
      </Component>;
    }
  }

  return WithNewReview;
};

export default withNewReview;
