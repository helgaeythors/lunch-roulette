import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: cyan,
  },
  status: {
    danger: 'orange',
  },
});

export default theme;