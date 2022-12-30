<template>
  <div class="container">
    <div class="row align-content-center" style="height: 100vh">
      <h1 class="mb-5 text-center fw-bold fs-1">This or That</h1>

      <div class="d-flex flex-wrap">
        <div class="card border-0 text-center" v-if="choice1">
          <img
            :src="choice1.first_choice_image_url"
            alt="Choice 1"
            class="choice-image rounded mb-3"
            @click="onSubmit(choice1, choice1?.first_choice_title)"
          />
          <h3 class="fs-3">{{ choice1?.first_choice_title }}</h3>
        </div>
        <div class="card border-0 text-center" v-if="choice2">
          <img
            :src="choice2?.second_choice_image_url"
            alt="Choice 2"
            class="choice-image rounded mb-3"
            @click="onSubmit(choice1, choice2?.second_choice_title)"
          />
          <h3 class="fs-3">{{ choice2?.second_choice_title }}</h3>
        </div>
      </div>
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
@import url('https://fonts.cdnfonts.com/css/muli');

body {
  font-family: 'Muli', sans-serif;     
}

.choice-image {
  width: 220px;
  height: 220px;
  object-fit: cover;
}

.flex-wrap {
  justify-content: center;
  row-gap: 20px;
}

@media (min-width: 768px) {
  .flex-wrap {
    justify-content: space-between;
  }

  .card {
    cursor: pointer;
  }
}
</style>
