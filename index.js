const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())


let persons = [{
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
},
{
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
},
{
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
},
{
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
}
]


function generateId() {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0;
    console.log(String(maxId + 1))
    return String(maxId + 1)
}

app.get('/api/person', (request, respone) => {
    respone.json(persons)
})

app.get("/info", (request, response) => {
    const now = new Date();
    const day = now.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[day]

    const month = now.getMonth();
    const months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
    const monthName = months[month]
    const date = now.getDate();
    const timeZone = now.getTimezoneOffset() / 60;

    const h = Math.floor(timeZone)
    const m = Math.abs(h - timeZone) * 60;
    const timeZoneString = `${h}${m}`

    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    response.send(`<p>Phonebook has info for ${persons.length} people <p/> <p> ${dayName} ${monthName} ${date}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${timeZoneString} (${timeZoneName})<p/>`)
})

app.get("/", (request, response) => {
    response.send("Welcome you son of a gun")
})

app.delete("/api/person/:id", (request, response) => {
    const id = request.params.id
    console.log(id)
    const note = persons.find(n => n.id === id)
    console.log(note)

    persons = persons.filter(p => p.id !== id);
    console.log(persons)
})

app.put("/api/person/:id", (request, response) => {
    const body = request.body;
    const note = persons.find(n => n.id === id)
    let noteToChange = { ...note }
    noteToChange.number = body.number
    persons = persons.map(p => p.id !== id ? p : noteToChange);
    response.status(203)
    response.json(noteToChange)
})

app.post("/api/person", (request, response) => {
    const body = request.body;

    if (body.name === '' || body.number === '') {
        response.status(404).send({ error: "invalid name and number" })
    }
    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number,
    }
    persons = persons.concat(person)
    response.status(203)
})
const PORT = 4011;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)

})