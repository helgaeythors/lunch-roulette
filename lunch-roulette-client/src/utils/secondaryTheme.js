import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';

const secondaryTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: orange,
  },
});

export default secondaryTheme;
