import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  //set state for guestList array
  const [list, setList] = useState([]);

  //fetch guest list from server, runs once
  useEffect(() => {
    const getList = async () => {
      const response = await fetch(
        `https://hedi-guest-list-server.herokuapp.com/`,
      );
      const data = await response.json();
      setList(data);
    };

    getList();
  }, []);

  // set state for input fields
  const [fname, setfName] = React.useState('');
  const [lname, setlName] = React.useState('');

  //when Submit button is clicked:
  const handleSubmit = (e) => {
    e.preventDefault();

    // create a new guest
    async function newGuest() {
      const response = await fetch(
        `https://hedi-guest-list-server.herokuapp.com/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: fname,
            lastName: lname,
          }),
        },
      );
      //eslint-disable-next-line no-unused-vars
      const createdGuest = await response.json();

      window.location.reload(false);
    }

    newGuest();
  };

  // set state for checkbox
  const [checkboxes, setCheckboxes] = React.useState({});

  // Object.keys() liefert ein Array, dessen Elemente Strings sind, welche die aufzählbaren Eigenschaften des Objekts respräsentieren.
  const checkboxKeys = Object.keys(checkboxes);

  //when Delete button is clicked:
  function handleDelete() {
    async function deleteGuest() {
      const response = await fetch(
        `https://hedi-guest-list-server.herokuapp.com/${checkboxKeys}`,
        {
          method: 'DELETE',
        },
      );
      //eslint-disable-next-line no-unused-vars
      const deletedGuest = await response.json();

      window.location.reload(false);
    }

    deleteGuest();
  }

  //when Edit button is clicked:
  function handleEdit() {
    async function editGuest() {
      const response = await fetch(
        `https://hedi-guest-list-server.herokuapp.com/${checkboxKeys}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ attending: true }),
        },
      );
      //eslint-disable-next-line no-unused-vars
      const updatedGuest = await response.json();

      window.location.reload(false);
    }
    editGuest();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register the guest:</h1>
      </header>
      {/* Personalia input fields */}
      <form onSubmit={handleSubmit}>
        <label>
          <span>First name: </span>
        </label>
        <input
          type="text"
          id="firstName"
          onChange={(e) => setfName(e.target.value)}
        />
        <br />
        <br />
        <label>Last name: </label>
        <input
          type="text"
          id="lastName"
          onChange={(e) => setlName(e.target.value)}
        />
        <br />

        <p>
          <button>Submit</button>
        </p>
      </form>

      {/* Tabelle */}
      <h1 className="guestlist"> Guest list:</h1>
      <p>
        Attending guests are marked <span className={'attending'}>green</span>,
        while not attending guests are marked{' '}
        <span className={'notAttending'}>red</span>.
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          {list.map((item) => (
            <tr
              key={item.id}
              className={item.attending ? 'attending' : 'notAttending'}
            >
              <td>
                <input
                  type="checkbox"
                  defaultChecked={checkboxes[item.id]}
                  onChange={() => {
                    setCheckboxes({ ...checkboxes, [item.id]: true });
                  }}
                />
              </td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit-Button */}
      <p>
        <label>
          <button
            type="button"
            onClick={(item) => handleEdit(item.id)}
            id="delete"
          >
            Confirm guest attendance
          </button>
        </label>
      </p>

      {/* Delete-Button */}
      <p>
        <label>
          <button
            type="button"
            onClick={(item) => handleDelete(item.id)}
            id="delete"
          >
            Delete guest
          </button>
        </label>
      </p>
    </div>
  );
}

export default App;
