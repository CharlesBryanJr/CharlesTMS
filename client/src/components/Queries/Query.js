import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { create_query } from '../../actions/Queries';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#424242',
    color: '#fff',
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    flex: 1,
  },
  stateInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  manageAgent: {
    backgroundColor: '#616161',
    color: '#fff',
  },
  formControl: {
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiSelect-icon': {
      color: '#fff',
    },
  },
  urlLink: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));

const initialState = {
  query: 'write a SQL query calculates the total number of COVID-19 tests conducted in each state and then list these states in descending order based on the volume of tests, starting with the state that has conducted the most tests.',
  database: 'covid-19',
  review_define_objective: false,
  review_before_generate: false,
  review_after_generate: false,
  review_after_reflect: false,
  research_critique: false,
  detailed: false,
  lastNode: null,
  nextNode: null,
  thread: { configurable: { thread_id: '1' } },
  draftRev: 0,
  count: '',
  writer_result: null,
  presigned_url: null,
  history: [],
};

const Query = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [hideCheckboxes, setHideCheckboxes] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    try {
      const result = await dispatch(create_query({ ...state, action }));

      setState((prevState) => ({
        ...prevState,
        query: result?.query || prevState.query,
        database: result?.database || prevState.database,
        review_define_objective: result?.review_define_objective ?? prevState.review_define_objective,
        review_before_generate: result?.review_before_generate ?? prevState.review_before_generate,
        review_after_generate: result?.review_after_generate ?? prevState.review_after_generate,
        review_after_reflect: result?.review_after_reflect ?? prevState.review_after_reflect,
        research_critique: result?.research_critique ?? prevState.research_critique,
        detailed: result?.detailed ?? prevState.detailed,
        lastNode: result?.lastNode ?? prevState.lastNode,
        nextNode: result?.nextNode ?? prevState.nextNode,
        thread: {
          ...prevState.thread,
          ...(result?.thread || {}),
        },
        draftRev: result?.draftRev ?? prevState.draftRev,
        count: result?.count !== '' ? Number(result.count) : prevState.count,
        writer_result: result?.writer_result ?? prevState.writer_result,
        presigned_url: result?.presigned_url ?? prevState.presigned_url,
        history: [...prevState.history, { query: prevState.query, response: result }],
      }));
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  const renderStateInfo = () => {
    const infoItems = ['lastNode', 'nextNode', 'draftRev', 'count'];
    return infoItems.map((item) => (
      <div key={item}>
        <Typography variant="caption">{item}</Typography>
        <Typography variant="body2">{state[item]}</Typography>
      </div>
    ));
  };

  const handleToggleCheckboxes = () => {
    setHideCheckboxes((prev) => !prev);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Database
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="database"
        value={state.database}
        onChange={handleChange}
        className={classes.input}
      />

      <Typography variant="h6" className={classes.title}>
        Natural Language SQL Query
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="query"
        value={state.query}
        onChange={handleChange}
        className={classes.input}
      />

      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) => handleSubmit(e, 'generate')}
        >
          GENERATE Query
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={(e) => handleSubmit(e, 'continue')}
        >
          CONTINUE Query
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleToggleCheckboxes}
        >
          {hideCheckboxes ? 'Show Checkboxes' : 'Hide Checkboxes'}
        </Button>
      </div>

      <div className={classes.stateInfo}>{renderStateInfo()}</div>

      <Accordion className={classes.manageAgent}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">MANAGE AGENT</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {!hideCheckboxes && (
              <Grid item xs={12}>
                <FormGroup row>
                  {['review_define_objective', 'review_before_generate', 'review_after_generate', 'review_after_reflect', 'research_critique'].map((item) => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={state[item]}
                          onChange={handleChange}
                          name={item}
                          color="primary"
                        />
                      }
                      label={item.replace(/_/g, ' ')}
                    />
                  ))}
                </FormGroup>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel>Writer Result</InputLabel>
                <Select
                  value={state.writer_result || ''}
                  onChange={handleChange}
                  name="writer_result"
                  label="Writer Result"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {state.writer_result && (
                    <MenuItem value={state.writer_result}>{state.writer_result}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel>Writer Explanation</InputLabel>
                <Select
                  value={state.writer_explanation || ''}
                  onChange={handleChange}
                  name="writer_explanation"
                  label="Writer Explanation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {state.writer_explanation && (
                    <MenuItem value={state.writer_explanation}>{state.writer_explanation}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            {state.presigned_url && (
              <Grid item xs={12}>
                <Link
                  className={classes.urlLink}
                  href={state.presigned_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to download a CSV of the results
                </Link>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default Query;