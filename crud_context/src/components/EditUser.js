import {useState, useContext, useEffect} from 'react'
import {GlobalContext} from '../context/GlobalState'
import {Link, useHistory} from 'react-router-dom'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

const EditUser = ({match}) => {
  const [selectedUser, setSelectedUser] = useState({
    id: '',
    name: ''
  })
  const {users, editUser} = useContext(GlobalContext)

  const history = useHistory()
  const currentUserId = match.params.id

  useEffect(() => {
    const userId = currentUserId
    const selectedUser = users.find(user => user.id === userId)
    setSelectedUser(selectedUser)
  }, [currentUserId, users])

  const handleSubmit = () => {
    editUser(selectedUser)

    history.push('/')
  }
  return (
    <Form onSubmit={handleSubmit} style={{margin: '50px'}}>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" placeholder="Enter name" name="name" value={selectedUser.name} onChange={(e) => setSelectedUser({...selectedUser, [e.target.name]: e.target.value})} />
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}

export default EditUser
