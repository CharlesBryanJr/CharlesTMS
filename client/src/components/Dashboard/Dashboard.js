import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useStyles from './styles.js';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.dashboardContainer}>
      <Typography variant="h4" className={classes.heading}>
        Dashboard
      </Typography>
      <div className={classes.itemContainer}>
        <div className={classes.item}>
          <Typography variant="h6">Carriers</Typography>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/Carriers" className={classes.link}>
                Carriers
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/CreateCarrier_TP" className={classes.link}>
                Create Carrier (TP)
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.item}>
          <Typography variant="h6">Loads</Typography>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/Loads" className={classes.link}>
                Loads
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/CreateLoad_TP" className={classes.link}>
                Create Load (TP)
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.item}>
          <Typography variant="h6">Invoices</Typography>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/Invoices" className={classes.link}>
                Invoices
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/CreateInvoice_TP" className={classes.link}>
                Create Invoice (TP)
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.item}>
          <Typography variant="h6">Drafts</Typography>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/Draft" className={classes.link}>
                Drafts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;