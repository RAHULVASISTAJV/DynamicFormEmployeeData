import React, { useState, useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/Container';
import Paper from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
function Viewdata(props) {
   const [data,setData] = useState([]);

   useEffect(() => {
      setData(props.location.state.detail)
   },[])

   const downloadFile = async () => {
      const fileName = "file";
      const json = JSON.stringify(data);
      const blob = new Blob([json],{type:'application/json'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

   return (
      <Container className="mid">
         <h1>Employee Data</h1>
         <Paper style={{maxHeight: 300, overflow: 'auto'}}>
         <List>
      <div >
       
         <div><pre>{JSON.stringify(data, null, 2) }</pre></div>

      </div>
      </List>
      </Paper>
      <Button           
          variant="contained" 
          color="primary" 
          type="submit" 
          style={{marginTop:20}}
          onClick={downloadFile}>
             Download
             </Button>
      </Container>
   );
}
export default Viewdata;