import './App.css';
import * as React from "react";
import BTCModel from './BTCModel';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ColDef, DataGrid } from '@material-ui/data-grid';

const logo = require('./logo.svg');

interface TableBTCModel extends BTCModel{
  name: string;
}

function App() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [exchangeData, setExchangeData] = React.useState<TableBTCModel[]>([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get('https://poloniex.com/public?command=returnTicker')
      .then((res: AxiosResponse) => {
        const data: { [name: string]: BTCModel} = res.data;
        const auxData = [];
        for(var [key, value] of Object.entries(data)) {
          let auxExchange: TableBTCModel = {
            name: key,
            ...value
          }
          auxData.push(auxExchange);
        }
        setExchangeData(auxData);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  const columns: ColDef[] = [
    { field: "id", headerName: "ID", type: "number" },
    { field: "name", headerName: "Name", type: "string" },
    { field: "lowestAsk", headerName: "Lowest Ask", type: "string" },
    { field: "highestBid", headerName: "Highest Bid", type: "string" },
    { field: "percentChange", headerName: "Percent Change", type: "string" },
    { field: "baseVolume", headerName: "Base Volume", type: "string" },
    { field: "quoteVolume", headerName: "Quote Volume", type: "string" },
    { field: "isFrozen", headerName: "Is Frozen", type: "string" },
    { field: "high24hr", headerName: "High 24hr", type: "string" },
    { field: "low24hr", headerName: "Low 24hr", type: "string" },
  ]

  return (
    <div className="App">
      <div style={{ height: 400, width: '70%' }}>
        <DataGrid
          rows={exchangeData}
          columns={columns}
          pageSize={5}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
