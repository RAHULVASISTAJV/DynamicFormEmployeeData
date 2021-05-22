import React, { useState} from 'react';
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
    { id: uuidv4(),name:'', designation: '',dob:'' },
  ]);
  const [type,setType] = useState([{type:'',phone:''}])
  const [skills,setSkills] = useState([''])
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields",inputFields);
    

  };
  const handleclick = (e) => {
    e.preventDefault();
    //this.props.router.push('/viewdata',{data: e.target.value});
    let data = {
        info: inputFields,
        type: type,
        skills: skills
    };
    history.push( {pathname: '/view',
    state: { detail: data }});

    setInputFields([
        { id: uuidv4(),name:'', designation: '',dob:'' },
      ])

      setType([{type:'',phone:''}])
      setSkills([''])
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
      <form className={classes.root} onSubmit={handleSubmit}>
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
              label="Dob"
              type="date"
              variant="outlined"
              value={inputField.dob}
              style = {{width: 460}}
              onChange={event => handleChangeInput(inputField.id, event)}
              required
            />
            <br></br>
           
          </div>
        )) }
        {type.map((t,idx) => (
<div>
<TextField
              name="type"
              label="Type"
              variant="outlined"
              value={t.type}
              onChange={event => {
                  let item =[...type];
                  item[idx].type = event.target.value;
                  setType(item)
              }}
            />
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              value={t.phone}
              onChange={event =>{
                let item =[...type];
                item[idx].phone = event.target.value;
                setType(item)
              }}
            />

              
            
            <IconButton
              onClick={() => {
                let item = [...type];
                let temp ={
                    type: '', phone:''
                }
                item.push(temp);
                setType(item)
              }}
            >
              <AddIcon />
            </IconButton>
            <br></br>
            
</div>
        ))}
        {skills.map((s,i) => (
            <div>
           <TextField
             name="skills"
             label="Skills"
             variant="outlined"
             value={s.skills}
             onChange={event => {

                let item =[...skills];
                item[i] = event.target.value;
                setSkills(item)
             }}
             style = {{width: 460}}
             required
           />
           <IconButton
                          onClick={() => {
                            let item = [...skills];
                          
                            item.push('');
                            setSkills(item)
                          }}
           >
             <AddIcon />
           </IconButton>
           </div>
        ))}
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}>
            Send
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