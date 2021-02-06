import {useState, useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import {Link, useHistory} from 'react-router-dom'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {v4 as uuid} from 'uuid'

const AddUser = () => {
  const [name, setName] = useState('')
  const {addUser} = useContext(GlobalContext)

  const history = useHistory()
  const handleSubmit = () => {
    const newUser = {
      id: uuid(),
      name
    }
    addUser(newUser)
    history.push('/')
  }
  return (
    <Form onSubmit={handleSubmit} style={{margin: '50px'}}>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}

export default AddUser
