type Identifiable = {
  id: number;
};

class Repository<T extends Identifiable> {
  private items: T[] = [];

  public add(item: T) {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return this.items;
  }

  removeById(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}

type User = Identifiable & {
  name: string;
  email: string;
};

type Book = Identifiable & {
  title: string;
  ISBN: number;
};

const usersRepository = new Repository<User>();
const bookRepository = new Repository<Book>();

usersRepository.add({
  id: 1,
  name: "Asif",
  email: "a@gmail.com",
});
usersRepository.add({
  id: 2,
  name: "Anjum",
  email: "b@gmail.com",
});

bookRepository.add({
  id: 1,
  title: "Harry Potter",
  ISBN: 3342424,
});

console.log(usersRepository.getAll());
console.log(usersRepository.getById(2));

console.log(bookRepository.getAll());
