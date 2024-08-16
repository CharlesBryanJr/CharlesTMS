import React, { useState } from 'react';
import {
  TextField, Button, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Link, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { create_query } from '../../actions/Queries';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '98%',
    margin: '0 auto',
    backgroundColor: '#424242',
    color: '#fff',
    padding: theme.spacing(3),
    position: 'relative',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(3),
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
  button: {
    marginBottom: theme.spacing(3),
  },
  stateInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  manageAgent: {
    backgroundColor: '#616161',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  formControl: {
    width: '100%',
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
    color: '#FFD700',
    '&:hover': {
      color: '#FFA500',
    },
  },
  exampleQuery: {
    cursor: 'pointer',
    marginBottom: '0.5rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
}));

const initialState = {
  query: '',
  database: 'covid-19',
  lastNode: null,
  nextNode: null,
  thread: { configurable: { thread_id: '1' } },
  draftRev: 0,
  count: '',
  writer_result: null,
  presigned_url: null,
  history: [],
};

const exampleQueries = [
  "Calculate the total number of COVID-19 tests conducted in each state and list them in descending order.",
  "Find the average daily increase in COVID-19 cases for each state during the first quarter of 2020.",
  "Determine which states have seen a decrease in the number of daily cases over the past two weeks."
];

const Query = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleExampleClick = (example) => {
    setState((prevState) => ({ ...prevState, query: example }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await dispatch(create_query({ ...state, action: 'generate' }));
      setState((prevState) => ({
        ...prevState,
        ...result,
        history: [...prevState.history, { query: prevState.query, response: result }],
      }));
    } catch (error) {
      console.error('Error submitting query:', error);
      setError('An error occurred while submitting the query. Please try again.');
    } finally {
      setIsLoading(false);
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

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        AI-Powered Natural Language to Athena SQL Converter
      </Typography>

      <Typography variant="body1" className={classes.subtitle}>
        Translate natural language queries into Athena SQL commands using our AI-powered agent. Simply ask a question to access your data.
      </Typography>

      <Typography variant="h6" className={classes.title}>
        Example Queries
      </Typography>
      {exampleQueries.map((example, index) => (
        <Typography
          key={index}
          variant="body2"
          onClick={() => handleExampleClick(example)}
          className={classes.exampleQuery}
        >
          {example}
        </Typography>
      ))}

      <Typography variant="h6" className={classes.title}>
        Database
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="database"
        value={state.database}
        className={classes.input}
        disabled
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
        multiline
        rows={4}
      />

      {error && (
        <Typography color="error" style={{ marginTop: '1rem' }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'GENERATE Query'}
      </Button>

      <div className={classes.stateInfo}>{renderStateInfo()}</div>

      <Paper className={classes.manageAgent}>
        <Typography variant="h6" gutterBottom>
          MANAGE AGENT
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel id="writer-result-label">Writer Result</InputLabel>
              <Select
                labelId="writer-result-label"
                value={state.writer_result || ''}
                onChange={handleChange}
                name="writer_result"
                label="Writer Result"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {state.writer_result && (
                  <MenuItem value={state.writer_result}>{state.writer_result}</MenuItem>
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
      </Paper>

      {isLoading && (
        <div className={classes.loadingOverlay}>
          <CircularProgress color="primary" size={60} />
        </div>
      )}
    </Paper>
  );
};

export default Query;