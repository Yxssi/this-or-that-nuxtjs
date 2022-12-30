<template>
  <div>
    <h1>This or That</h1>

    <div class="choice-container" v-if="choice1">
      <img
        :src="choice1.first_choice_image_url"
        alt="Choice 1"
        class="choice-image"
        @click="onSubmit(choice1, choice1?.first_choice_title)"
      />
      <h2>{{ choice1?.first_choice_title }}</h2>
    </div>
    <div class="choice-container" v-if="choice2">
      <img
        :src="choice2?.second_choice_image_url"
        alt="Choice 2"
        class="choice-image"
        @click="onSubmit(choice1, choice2?.second_choice_title)"
      />
      <h2>{{ choice2?.second_choice_title }}</h2>
    </div>

    <div class="result-container" v-if="!choice1 && !choice2">
      <div class="user-choices-box">
        <h2>Here are your choices :</h2>
        <div v-for="choice in choiceByUser" :key="choice._id">
          <ul>
            <li>{{ choice }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
export default {
  data() {
    return {
      choiceByUser: [],
      choice1: {
        first_choice_title: "",
        first_choice_image_url: "",
      },
      choice2: {
        second_choice_title: "",
        second_choice_image_url: "",
      },
      choices: [
        {
          first_choice_title: "",
          first_choice_image_url: "",
          second_choice_title: "",
          second_choice_image_url: "",
        },
      ],
      index: 0,
    };
  },
  methods: {
    getNextChoice() {
      this.choice1 = this.choices[this.index];
      this.choice2 = this.choices[this.index];
      this.index++;
    },

    getChoices() {
      axios
        .get(`https://this-or-that-backend.onrender.com/api/v1/choice`)
        .then((response) => {
          this.choices = response.data;
          this.getNextChoice();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    postChoice() {
      axios.post(
        `https://this-or-that-backend.onrender.com/api/v1/user/choice/${title}`,
        {
          choice: choice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },

    setChoiceByUser(choice) {
      this.choiceByUser.push(choice);
    },

    onSubmit(choice, title) {
      this.setChoiceByUser(title);
      console.log("choice : ", title);
      // this.postChoice(choice)
      this.getNextChoice();
    },
  },
  created() {
    this.getChoices();
  },
};
</script>

<style>
.choice-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.choice-image {
  width: 300px;
  height: 300px;
}
</style>
