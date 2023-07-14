import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        />
      </LocalizationProvider>
    );
  }
}

export default SignIn;