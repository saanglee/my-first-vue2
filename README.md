# To Do It! 
<목차>
1. Stacks
2. 실행 방법
3. 디렉토리 구조
4. 주요기능
5. 동작 화면


# 🛠 Stacks
- `vue.js (ver.2)`

### Libarary
- `vuetify`, `axios`, `sass`, `firebase`

# 💻 실행 방법 (mac)
```
git clone https://github.com/saanglee/my-first-view

cd todo

npm install

npm run serve
```

# 📂 디렉토리 구조
### `todo/src`
```
├── App.vue
├── assets
├── components
│   ├── AddTodo.vue
│   ├── InputForm.vue
│   └── TodoList.vue
├── main.js
├── plugins
│   └── vuetify.js
├── router
│   └── index.js
├── store
│   ├── index.js
│   └── modules
│       ├── todo.js
│       └── user.js
└── views
    ├── Login.vue
    ├── Register.vue
    └── Todo.vue
```



# 💫 주요 기능
- 로그인, 회원가입
- CRUD  
  - Todo 리스트 보기
  - Todo 입력
  - Todo 수정 / 삭제
  - 완료된 항목 개수 확인
## 1. 로그인/회원가입

### 로그인 화면
<img width="1273" alt="image" src="https://user-images.githubusercontent.com/92660097/198518924-d0b5bfad-879e-4d54-b9b2-a2328224e8ed.png">

- 회원가입 화면도 동일합니다.email, password만을 입력하여 회원가입, 로그인 합니다.
- 이메일과 비밀번호 유효성 검사를 합니다.
- firebase를 이용하여 사용자 인증을 합니다.
- 로그인된 사용자 정보는 SessionStorage에 저장하며 로그아웃 시 SessionStorage에서 사용자 정보를 삭제합니다.

- 로그인, 회원가입 화면의 input form 부분이 동일한 구조이므로 InputForm.vue 컴포넌트로 분리하여 각 Login.vue, Register.vue 페이지에서 재사용하였습니다.
- InputForm.vue의 props로 isLogin(Boolean)값을 보내어 로그인일 경우 로그인 버튼, 아닐 경우 회원가입 렌더링되도록 했습니다.

InputForm.vue - script 부분) 유효성 검사
```jsx
  data() {
    return {
      email: "",
      password: "",
      validateEmail: [
        (value) => !!value || "이메일을 입력해주세요.",
        (value) => {
          const replacedValue = value.replace(/(\s*)/g, ""); 
          const regex =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          return regex.test(replacedValue) || "이메일 형식을 확인해주세요.";
        },
      ],
      validatePassword: [
        (value) => !!value || "비밀번호를 입력해주세요,",
        (value) => {
          const replacedValue = value.replace(/(\s*)/g, "");
          return replacedValue.length >= 2 || "2자리 이상 입력해주세요.";
        },
      ],
    };
  },
```

InputForm.vue - script 부분) 로그인, 회원가입 로직
```jsx
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.saveUserToStorage(user);
          this.$router.replace("/todo").catch(() => {});
          this.reload();
        })
        .catch((error) => {
          this.email = "";
          this.password = "";
          console.log(error.code, error.message);
          alert("이메일 또는 비밀번호를 확인해주세요.");
        });
    },
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$router.push("/");
          alert(`${userCredential.user}님 회원가입이 완료되었습니다.`);
        })
        .catch((error) => {
          const { code, message } = error;
          console.log("errorCode, errorMsg : ", code, message);
        });
    },
    saveUserToStorage(user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    reload() {
      window.location.reload(true);
    },
  },
```

### 로그인 후

- SessionStorage에서 사용자 id를 가져와 Navbar 상단에 노출합니다.
<img width="1075" alt="image" src="https://user-images.githubusercontent.com/92660097/198519135-1df9711d-721a-4ecc-83c1-32b9087fe3e4.png">



## 2. Todo 입력, List읽기, 수정, 삭제

### Todo.vue
- Todo.vue의 하위 컴포넌트로 AddTodo.vue와 TodoList.vue컴포넌트가 있습니다.
- Todo.vue
  - firebase에 Todo 추가하기, firebase에서 Todo 리스트를 가져오기, 삭제하기로직이 있습니다.
  - 추가 시 가장 최근의 Todo가 가장 상단으로 오도록 하기 위해 push 대신 unshift메서드를 사용하였습니다.
```jsx
    async toggleCheckBox({ targetId, current }) {
      console.log(targetId, current);
      const targetItem = doc(db, "todos", targetId);
      await updateDoc(targetItem, {
        completed: !current,
      });
    },
    async deleteTodo(targetId) {
      const filteredTodos = this.todos.filter((todo) => todo.id !== targetId);
      await deleteDoc(doc(db, "todos", targetId));
      this.todos = filteredTodos;
    },
    async addTodo(newTodo) {
      const newItem = { todo: newTodo, completed: false, isEditable: false };
      if (newItem.todo) {
        await addDoc(collection(db, "todos"), newItem);
        this.todos.unshift(newItem);
      }
      return;
    },
    async getTodos() {
      const querySnapShot = await getDocs(collection(db, "todos"));
      querySnapShot.forEach((doc) => {
        this.todos.push({
          id: doc.id,
          todo: doc.data().todo,
          completed: doc.data().completed,
          isEditable: false,
        });
      });
    },
```

- 완료된 Todo 리스트 개수를 계산하여 TodoList.vue컴포넌트의 props로 내려줍니다.
```jsx
  computed: {
    numberOfCompletedTodo() {
      return this.todos.filter((todo) => todo.completed).length;
    },
  },
```


# 동작 화면
### Todo 입력, 수정
![Kapture 2022-10-28 at 14 36 23](https://user-images.githubusercontent.com/92660097/198518808-71ae778c-e5d7-42dc-98f1-a50146dd8a80.gif)

### Todo 삭제 / 로그아웃
![Kapture 2022-10-28 at 14 41 02](https://user-images.githubusercontent.com/92660097/198518789-ed34c4a1-dc04-4e22-8db8-2e564e3a3c1c.gif)



