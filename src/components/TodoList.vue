<template>
  <div>
    <v-container class="py-8 px-6">
      <v-card class="ma-3">
        <v-card-subtitle class="text-h5"> ✨ 완료된 항목 - 개 </v-card-subtitle>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-subheader> Today </v-subheader>
            <v-list>
              <template v-for="(todo, index) in todos">
                <v-list-item :key="index">
                  <v-checkbox
                    :checked="todo.checked"
                    color="deep-purple accent-4"
                  />
                  <v-list-item-content class="item-content" v-if="!isEditable">
                    {{ todo.todoText }}
                  </v-list-item-content>
                  <v-text-field
                    v-else-if="isEditable"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></v-text-field>

                  <v-btn @click="isEditable = !isEditable">수정</v-btn>
                  <v-btn
                    value="todo.id"
                    @click="deleteTodo(todo.id)"
                    color="#F50057"
                    dark
                    >삭제</v-btn
                  >
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TodoItem from "@/components/TodoItem.vue";
import db from "../main";
export default {
  data() {
    return {
      // cards: ["Today", "Yesterday"],
      todos: [],
      isEditable: false,
    };
  },
  components: {
    TodoItem,
  },
  methods: {
    // ✨ Get todos from firebase
    async getTodos() {
      const querySnapShot = await getDocs(collection(db, "todos"));
      querySnapShot.forEach((doc) => {
        this.todos.push({
          id: doc.id,
          checked: doc.data().checked,
          todoText: doc.data().todoText,
        });
        console.log(doc.id);
      });

      // this.todos.forEach((todo) => {
      //   console.log(todo.todoText);
      // });
    },

    // ✨ Delete Todo from firbase by id
    async deleteTodo(id) {
      console.log("id ", id);
      // const targetId = "zQZE9EkERE2sVty2BPjh";
      const targetId = id;
      await deleteDoc(doc(db, "todos", targetId));
    },
    // ✨ Update Todo by id
    async updateTodo() {
      // const targetId = "RsgRXs74XfkOPOI0EGaO";
      // const targetItem = doc(db, "todos", targetId);
      // await updateDoc(targetItem, {
      //   todoText: "내용 수정 테스트",
      // });
    },
  },
  computed: {
    numberOfCompletedTodo() {
      // return this.$store.getters["todo/numberOfCompletedTodo"];
    },
  },
  mounted() {
    // 👩‍🔬 Test
    // console.log(this.todos);

    this.getTodos();
    this.deleteTodo();
    this.updateTodo();
  },
};
</script>

<style lang="scss" scoped>
.item-content {
  height: 30px;
}
</style>
