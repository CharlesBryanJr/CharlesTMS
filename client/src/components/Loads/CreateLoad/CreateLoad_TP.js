import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, MenuItem } from "@material-ui/core";
import useStyles from "./styles";
import { createLoad } from "../../../actions/Loads";

const CreateLoad = ({ setCurrentId }) => {
  // const { loads, isLoading } = useSelector((state) => state.loads);
  const classes = useStyles();
  const dispatch = useDispatch();

  const empty_LoadData = {
    "ExternalLoadKey": "Load42821",
    "ExternalPayeeKey": "CarrierId123",
    "LoadStatusId": 3,
    "ReferenceNo": "54321",
    "PickupDate": "2018-08-08",
    "OriginName": "Shipper Co",
    "OriginAddress1": "123 Main St",
    "OriginAddress2": "",
    "OriginCity": "Coppell",
    "OriginState": "TX",
    "OriginPostalCode": "75019",
    "OriginCountry": "USA",
    "DeliveryDate": "2018-08-10",
    "DestinationConsignee": "Shipper Co",
    "DestinationAddress1": "123 Main St",
    "DestinationAddress2": "",
    "DestinationCity": "Bloomington",
    "DestinationState": "MN",
    "DestinationPostalCode": "55438",
    "DestinationCountry": "US",
    "Distance": 897,
    "DistanceUnits": 1,
    "TotalWeight": 500,
    "WeightUnitTypeId": 1,
    "EquipmentType": 2,
    "Volume": 500,
    "VolumeUnits": 1,
    "LoadDescription": "Fluffy Pillows",
    "LTLFlag": false,
    "AssignedTractorNumber": "123",
    "AssignedTrailerNumber": "456",
    "Division": "",
    "LineItems": [
      {
        "ChargeTypeId": 1,
        "Description": "Linehaul",
        "Amount": 1200
      },
      {
        "ChargeTypeId": 2,
        "Description": "Fuel Surcharge",
        "Amount": -1500
      }
    ],
    "AdditionalData": [
      {
        "Field": "Load#2",
        "Value": "123456",
        "Type": 1
      },
      {
        "Field": "POD#",
        "Value": "888888801",
        "Type": 1
      }
    ],
    "Stops": [
      {
        "Consignee": "Stop User",
        "Sequence": "2",
        "Address1": "632 42nd St2",
        "Address2": "Unit 2",
        "City": "Ft Worth",
        "State": "TX",
        "PostalCode": "76036",
        "Country": "US",
        "StopDeliveryDate": "2016-07-16"
      }
    ],
  };  
  
  const [loadData, setLoadData] = useState(empty_LoadData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLoad(loadData));
    setLoadData((prevLoadData) => {
      return { ...empty_LoadData };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nestedProperties = name.split('.');
    if (nestedProperties.length > 1) {
      setLoadData((prevLoadData) => {
        const updatedData = { ...prevLoadData };
        let currentLevel = updatedData;
        for (let i = 0; i < nestedProperties.length - 1; i++) {
          const nestedProperty = nestedProperties[i];
          if (!currentLevel[nestedProperty]) {
            currentLevel[nestedProperty] = {};
          }
          currentLevel = currentLevel[nestedProperty];
        }
        currentLevel[nestedProperties[nestedProperties.length - 1]] = value;
        return { ...updatedData };
      });
    } else {
      setLoadData((prevLoadData) => {
        return { ...prevLoadData, [name]: value };
      });
    }
  };  

  const generateRandomData = () => {
    const randomLoadData = {};

    for (const key in empty_LoadData) {
      if (empty_LoadData.hasOwnProperty(key)) {
        if (typeof empty_LoadData[key] === "string") {
          randomLoadData[key] = generateRandomString();
        } else if (typeof empty_LoadData[key] === "boolean") {
          randomLoadData[key] = generateRandomBoolean();
        } else if (typeof empty_LoadData[key] === "number") {
          randomLoadData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_LoadData[key])) {
          randomLoadData[key] = generateRandomArray(empty_LoadData[key]);
        } else if (typeof empty_LoadData[key] === "object") {
          randomLoadData[key] = generateRandomObject(empty_LoadData[key]);
        }
      }
    }
    setLoadData(randomLoadData);
  };

  const generateRandomString = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = Math.floor(Math.random() * 10) + 1;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const generateRandomBoolean = () => {
    return Math.random() < 0.5;
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * 5) + 1;
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(generateRandomString());
    }
    return array;
  };

  const generateRandomObject = () => {
    const obj = {};
    obj.name = generateRandomString();
    obj.line_1 = generateRandomString();
    obj.line_2 = generateRandomString();
    obj.city = generateRandomString();
    obj.state = generateRandomString();
    obj.postal_code = generateRandomString();
    return obj;
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        onClick={generateRandomData}
      >
        Generate Random Load Data
      </Button>
      <br />
      <TextField
        name="ExternalLoadKey"
        label="ExternalLoadKey"
        value={loadData.ExternalLoadKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="ExternalPayeeKey"
        label="ExternalPayeeKey"
        value={loadData.ExternalPayeeKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LoadStatusId"
        label="LoadStatusId"
        value={loadData.LoadStatusId || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="ReferenceNo"
        label="ReferenceNo"
        value={loadData.ReferenceNo || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="PickupDate"
        label="PickupDate"
        value={loadData.PickupDate || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginName"
        label="OriginName"
        value={loadData.OriginName || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginAddress1"
        label="OriginAddress1"
        value={loadData.OriginAddress1 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginAddress2"
        label="OriginAddress2"
        value={loadData.OriginAddress2 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginCity"
        label="OriginCity"
        value={loadData.OriginCity || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginState"
        label="OriginState"
        value={loadData.OriginState || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginPostalCode"
        label="OriginPostalCode"
        value={loadData.OriginPostalCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginCountry"
        label="OriginCountry"
        value={loadData.OriginCountry || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DeliveryDate"
        label="DeliveryDate"
        value={loadData.DeliveryDate || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationConsignee"
        label="DestinationConsignee"
        value={loadData.DestinationConsignee || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationAddress1"
        label="DestinationAddress1"
        value={loadData.DestinationAddress1 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationAddress2"
        label="DestinationAddress2"
        value={loadData.DestinationAddress2 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationCity"
        label="DestinationCity"
        value={loadData.DestinationCity || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationState"
        label="DestinationState"
        value={loadData.DestinationState || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationPostalCode"
        label="DestinationPostalCode"
        value={loadData.DestinationPostalCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationCountry"
        label="DestinationCountry"
        value={loadData.DestinationCountry || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Distance"
        label="Distance"
        value={loadData.Distance || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DistanceUnits"
        label="DistanceUnits"
        value={loadData.DistanceUnits || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="TotalWeight"
        label="TotalWeight"
        value={loadData.TotalWeight || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="WeightUnitTypeId"
        label="WeightUnitTypeId"
        value={loadData.WeightUnitTypeId || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="EquipmentType"
        label="EquipmentType"
        value={loadData.EquipmentType || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Volume"
        label="Volume"
        value={loadData.Volume || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="VolumeUnits"
        label="VolumeUnits"
        value={loadData.VolumeUnits || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LoadDescription"
        label="LoadDescription"
        value={loadData.LoadDescription || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LTLFlag"
        label="LTLFlag"
        value={loadData.LTLFlag || false}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        select
        className={classes.textField}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </TextField>
      <TextField
        name="AssignedTractorNumber"
        label="AssignedTractorNumber"
        value={loadData.AssignedTractorNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AssignedTrailerNumber"
        label="AssignedTrailerNumber"
        value={loadData.AssignedTrailerNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Division"
        label="Division"
        value={loadData.Division || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LineItems[0].ChargeTypeId"
        label="Line Item 1 - Charge Type Id"
        value={loadData.LineItems && loadData.LineItems[0].ChargeTypeId}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LineItems[0].Description"
        label="Line Item 1 - Description"
        value={loadData.LineItems && loadData.LineItems[0].Description}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LineItems[0].Amount"
        label="Line Item 1 - Amount"
        value={loadData.LineItems && loadData.LineItems[0].Amount}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LineItems[1].ChargeTypeId"
        label="Line Item 2 - Charge Type Id"
        value={loadData.LineItems && loadData.LineItems[1].ChargeTypeId}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LineItems[1].Description"
        label="Line Item 2 - Description"
        value={loadData.LineItems && loadData.LineItems[1].Description}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LineItems[1].Amount"
        label="Line Item 2 - Amount"
        value={loadData.LineItems && loadData.LineItems[1].Amount}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AdditionalData[0].Field"
        label="Additional Data 1 - Field"
        value={loadData.AdditionalData && loadData.AdditionalData[0].Field}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AdditionalData[0].Value"
        label="Additional Data 1 - Value"
        value={loadData.AdditionalData && loadData.AdditionalData[0].Value}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AdditionalData[0].Type"
        label="Additional Data 1 - Type"
        value={loadData.AdditionalData && loadData.AdditionalData[0].Type}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
    >
        Create Load
      </Button>
    </form>
  );
};

export default CreateLoad;
