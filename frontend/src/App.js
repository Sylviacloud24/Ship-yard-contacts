import React, {useState, useEffect} from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({name:'', email:'', phone:''});

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/contacts`)
      .then(r=>r.json()).then(setContacts)
      .catch(()=>setContacts([]));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/contacts`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    setForm({name:'',email:'',phone:''});
    const r = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/contacts`);
    setContacts(await r.json());
  };

  return (
    <div style={{padding:20}}>
      <h2>Contacts</h2>
      <form onSubmit={submit}>
        <input placeholder="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {contacts.map(c=> <li key={c.id}>{c.name} - {c.email} - {c.phone}</li>)}
      </ul>
    </div>
  );
}

export default App;
