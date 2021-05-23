import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function Form() {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(),name:'', designation: '',type:[{type:'',phone:''}],dob:'',skills:[''] },
  ]);
  const history = useHistory();



  const handleclick = (e) => {
   
    e.preventDefault();

    let t = [];
    inputFields.map((input,idx) => {
      if(input.name && input.designation){
        t.push(idx)
      }
    })
    if(t.length === inputFields.length){
      history.push( {pathname: '/view',
      state: { detail: inputFields }});
    } else {
      alert("Please fill the name and designation fields")
    }
   

  }

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }


  return (
    <Container>
      <h1>Employee Data</h1>
      <form className={classes.root} >
        { inputFields.map((inputField,idx) => (
          <div key={inputField.id}>
            <TextField
              name="name"
              id="Fullwidthform"
              label="Enter Name"
              variant="outlined"
              value={inputField.name}
              onChange={event => handleChangeInput(inputField.id, event)}
              required
              style = {{width: 460}}
              
            />
            <br></br>
            <TextField
              name="designation"
              label="Designation"
              variant="outlined"
              value={inputField.designation}
              style = {{width: 460}}
              onChange={event => handleChangeInput(inputField.id, event)}
              required
            />
            <br></br>
            <TextField
              name="dob"
              type="date"
              variant="outlined"
              value={inputField.dob}
              style = {{width: 460}}
              onChange={event => handleChangeInput(inputField.id, event)}
              required
            />
            <br></br>
            {inputField.type.map((t,i) => (
<div>
<TextField
              name="type"
              label="Type"
              variant="outlined"
              value={t.type}
              onChange={event => {
                  let arr = [...inputFields]
                  let item = arr[idx].type;
                  item[i].type = event.target.value;
                  arr[idx].type = item;
                  setInputFields(arr)
              }}
            />
            <TextField
              name="phone"
              label="Phone"
              type ="number"
              variant="outlined"
              value={t.phone}
              onChange={event =>{
                let arr = [...inputFields]
                  let item = arr[idx].type;
                  item[i].phone = event.target.value;
                  arr[idx].type = item;
                  setInputFields(arr)
              }}
            />

              
            
            <IconButton
              onClick={() => {
                let arr = [...inputFields]
                let temp = {
                    type: '', phone:''
                }
                arr[idx].type.push(temp);
                setInputFields(arr)
              }}
            >
              <AddIcon />
            </IconButton>
            <br></br>
            
</div>
        ))}
        {inputField.skills.map((s,i) => (
            <div>
           <TextField
             name="skills"
             label="Skills"
             variant="outlined"
             value={s.skills}
             onChange={event => {
              let arr = [...inputFields]
              let item = arr[idx].skills;
              item[i] = event.target.value;
              arr[idx].skills = item;
              setInputFields(arr)
             }}
             style = {{width: 460}}
             required
           />
           <IconButton
                          onClick={() => {
                            let arr = [...inputFields];
                            arr[idx].skills.push('');
                            setInputFields(arr)
                          }}
           >
             <AddIcon />
           </IconButton>
           </div>
        ))}
          </div>
        )) }
       
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={() => {
            setInputFields([...inputFields, { id: uuidv4(),name:'', designation: '',type:[{type:'',phone:''}],dob:'',skills:[''] }, ])
          }}
          >
            Add Employee
          </Button>


        <Button
        className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleclick}>
            ViewData
        </Button>


      </form>
    </Container>
  );
}

export default Form;