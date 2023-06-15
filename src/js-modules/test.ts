

interface User {
  login: string;
  email: string;
  password: string;
  isOnline: boolean;
  lastVisited: Date;
}

const user1: User = {
  login: 'Vlad',
  email: 'vlad@.com',
  password: '12345',
  isOnline: false,
  lastVisited: new Date(2023, 5, 10)
}


interface Admin {
  login: string;
  email: string;
  password: string;
  isOnline: boolean;
  lastVisited: Date;
  role: string;
}

const admin1: Admin = {
  login: 'Vladislav',
  email: 'vlad@.com',
  password: '12345',
  isOnline: false,
  lastVisited: new Date(2023, 5, 10),
  role: 'superAdmin'
}



function login(user: { login: string, password: string }): void {
  if (user.login.length > 0, user.password.length > 0) {
    console.log(`Привет ${user.login}`);
  }
}

login(user1);
login(admin1);