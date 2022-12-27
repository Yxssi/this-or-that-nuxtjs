<template>
  <div>
    <h1>This or That</h1>
    <div class="user-choices-box">
      <h2>Choices by User</h2>
      <div v-for="choice in choiceByUser" :key="choice._id">
        <ul>
          <li>{{ choice }}</li>
        </ul>
      </div>
    </div>
    <div class="choice-container">
      <img
        :src="choice1.first_choice_image_url"
        alt="Choice 1"
        class="choice-image"
        @click="onSubmit(choice1, choice1.first_choice_title)"
      />
      <h2>{{ choice1.first_choice_title }}</h2>
    </div>
    <div class="choice-container">
      <img
        :src="choice2.second_choice_image_url"
        alt="Choice 2"
        class="choice-image"
        @click="onSubmit(choice1, choice2.second_choice_title)"
      />
      <h2>{{ choice2.second_choice_title }}</h2>
    </div>
    <button @click="getRandomChoices">Get New Choices</button>
  </div>
</template>

<script>
import axios from "axios";
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
    };
  },
  methods: {
    getRandomChoices() {
      const randomIndex1 = Math.floor(Math.random() * this.choices.length);
      const randomIndex2 = Math.floor(Math.random() * this.choices.length);

      this.choice1 = this.choices[randomIndex1];
      this.choice2 = this.choices[randomIndex1];
      console.log(this.choice1, this.choice2);
    },

    getChoices() {
      axios
        .get(`${import.meta.env.VITE_BACK_API}/choice`)
        .then((response) => {
          this.choices = response.data;
          this.getRandomChoices();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    setChoiceByUser(choice) {
      this.choiceByUser.push(choice);
    },

    onSubmit(choice, title) {
      this.setChoiceByUser(title);
      axios.post(
        `${import.meta.env.VITE_BACK_API}/user/choice/${title}`,
        {
          choice: choice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.getRandomChoices();
    },
  },
  created() {
    this.getChoices();
    this.getRandomChoices();
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
