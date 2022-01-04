import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      margin: '5px 5px 5px 0',
    },
    subtitle: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
    },
    spacing: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
  }),
);

export default useStyles;