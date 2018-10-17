const index = 0;
export default {
  getAll() {
    return JSON.parse(localStorage.getItem("people")) || [];
  },
  saveAll(persons){
    localStorage.setItem("people", JSON.stringify(persons));
  },
  getOne(id) {
    return new Promise((res, rej) => {
      try {
        const persons = this.getAll();

        setTimeout(() => {
          res(persons.find(person => person.id === id));
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },
  replace (id){

  },
  save(name, age, sex) {
    let persons = this.getAll();
    let i = 0;
    for (let p of persons) {
      i = p.id + 1;
    }
    let people = {
      id: i,
      nombre: name,
      edad: age,
      sexo: sex,
    }
    persons.push(people);
    this.saveAll(persons)
  },
}